import { Hono } from "hono";
import prisma from "../prisma";
import { UserCreateInputSchema, UserSchema, UserUpdateInputSchema } from "../zod";
import { Variables } from "hono/types";
import { error, success } from "../response";
import { User } from "@prisma/client";
import { hasPermission, userId, user as authUser } from "../auth";

const userRoutes = new Hono<{ Variables: Variables }>();

/**
 * Read All (search, filter, sort)
 */
userRoutes.get("/", async (c) => {

    if(!await hasPermission(
        userId(c)!,
        "user:read",
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
    Object.keys(UserSchema.keyof().Values).forEach(k => {
        const val = c.req.query(k);
        if (val !== undefined) {
            filters[k] = val;
        }
    });

    const search = c.req.query("s");
    if(search) {
        const pFilter = (filters as User);
        
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

    const users = await prisma.user.findMany({
        where: filters,
        orderBy
    });

    return success(c, users);
});

/**
 * Read One
 */
userRoutes.get("/:id{[0-9]+}", async (c) => {

    const isMe = userId(c)! === parseInt(c.req.param("id"));
    if(!isMe) {
        const hasReadPermission = await hasPermission(
            userId(c)!,
            ["user:read", "user:get"], true
        );
        if(!hasReadPermission) return error(c, "You do not have permission to read this user", 403);
    }

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(c.req.param("id"))
        }
    });

    if(!user) return error(c, "User not found", 404);


    return success(c, user);
});

/**
 * Create
 */
userRoutes.post("/", async (c) => {
    if(!await hasPermission(
        userId(c)!,
        "user:create",
    )) {
        return error(c, "You do not have access to this operation", 403)
    }

    const parsed = await UserCreateInputSchema.safeParseAsync(await c.req.json());

    if (!parsed.success) {
        return c.json({
            success: false,
            errors: parsed.error.flatten(),
        });
    }

    const user = await prisma.user.create({ data: parsed.data });

    return success(c, user);
});

/**
 * Update
 */
userRoutes.put("/:id{[0-9]+}", async (c) => {
    if(!await hasPermission(
        userId(c)!,
        ["user:create", "user:update"], true,
    )) {
        return error(c, "You do not have access to this operation", 403)
    }

    const parsed = await UserUpdateInputSchema.safeParseAsync(await c.req.json());

    if (!parsed.success) {
        return c.json({
            success: false,
            errors: parsed.error.flatten(),
        });
    }

    const user = await prisma.user.update({ where: {
        id: parseInt(c.req.param("id"))
    }, data: parsed.data });

    return success(c, user);
});

/**
 * Delete
 */
userRoutes.delete("/:id{[0-9]+}", async (c) => {
    if(!await hasPermission(
        userId(c)!,
        "user:delete",
    )) {
        return error(c, "You do not have access to this operation", 403)
    }

    const user = await prisma.user.delete({ where: {
        id: parseInt(c.req.param("id"))
    }});

    return success(c, user.deleted);
});

export default userRoutes;
