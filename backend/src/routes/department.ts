import { Hono } from "hono";
import prisma from "../prisma";
import { DepartmentSchema, DepartmentUpdateInputSchema } from "../zod";
import { Variables } from "hono/types";
import { error, success } from "../response";
import { Department } from "@prisma/client";
import { hasPermission, userId, user } from "../auth";

const departmentRoutes = new Hono<{ Variables: Variables }>();

/**
 * Read All (search, filter, sort)
 */
departmentRoutes.get("/", async (c) => {
    
    if(!await hasPermission(
        userId(c)!,
        "department:read",
    )) {
        return error(c, "You do not have access to this operation", 403)
    }

    const orderBy = {} as any;
    const sortBy: string = c.req.query("b") ?? "id";
    const sortOrder: string = c.req.query("o") ?? "desc";
    orderBy[sortBy] = sortOrder;

    const filters: any = {
        deleted: false
    };

    Object.keys(DepartmentSchema.keyof().Values).forEach(k => {
        const val = c.req.query(k);
        if (val !== undefined) {
            filters[k] = val;
        }
    });

    const search = c.req.query("s");
    if(search) {
        const pFilter = (filters as Department);
        
        filters.OR = [];
        // search name
        if (pFilter.name === undefined) {
            filters.OR = [
                ...filters.OR,
                {
                    name: {
                        contains: search,
                    }
                }
            ];
        }
    }

    const departments = await prisma.department.findMany({
        where: filters,
        orderBy
    });

    return success(c, departments);
});

/**
 * Read One
 */
departmentRoutes.get("/:id{[0-9]+}", async (c) => {

    const isMine = (await user(c))!.department_id === parseInt(c.req.param("id"));
    if(!isMine) {
        const hasReadPermission = await hasPermission(
            userId(c)!,
            ["department:read", "department:get"], true
        );
        if(!hasReadPermission) return error(c, "You do not have permission to read this department", 403);
    }

    const department = await prisma.department.findUnique({
        where: {
            id: parseInt(c.req.param("id"))
        }
    });

    if(!department) return error(c, "Department not found", 404);


    return success(c, department);
});

/**
 * Create
 */
departmentRoutes.post("/", async (c) => {
    if(!await hasPermission(
        userId(c)!,
        "department:create",
    )) {
        return error(c, "You do not have access to this operation", 403)
    }

    const parsed = await DepartmentSchema.safeParseAsync(await c.req.json());

    if (!parsed.success) {
        return c.json({
            success: false,
            errors: parsed.error.flatten(),
        });
    }

    const department = await prisma.department.create({ data: parsed.data });

    return success(c, department);
});

/**
 * Update
 */
departmentRoutes.put("/:id{[0-9]+}", async (c) => {
    if(!await hasPermission(
        userId(c)!,
        ["department:create", "department:update"], true,
    )) {
        return error(c, "You do not have access to this operation", 403)
    }

    const parsed = await DepartmentUpdateInputSchema.safeParseAsync(await c.req.json());

    if (!parsed.success) {
        return c.json({
            success: false,
            errors: parsed.error.flatten(),
        });
    }

    const department = await prisma.department.update({ where: {
        id: parseInt(c.req.param("id"))
    }, data: parsed.data });

    return success(c, department);
});

/**
 * Delete
 */
departmentRoutes.delete("/:id{[0-9]+}", async (c) => {
    if(!await hasPermission(
        userId(c)!,
        "department:delete",
    )) {
        return error(c, "You do not have access to this operation", 403)
    }

    const department = await prisma.department.delete({ where: {
        id: parseInt(c.req.param("id"))
    }});

    return success(c, department.deleted);
});

export default departmentRoutes;
