import { Hono } from "hono";
import prisma from "../prisma";
import { PermitCreateInputSchema, PermitSchema, PermitUncheckedCreateInputSchema, PermitUpdateInputSchema } from "../zod";
import { Variables } from "hono/types";
import { error, success } from "../response";
import { Permit } from "@prisma/client";
import { addDays } from "../utils";
import { hasPermission, user, userId } from "../auth";

export enum PermitType {
    Restricted  = "restricted",
    Temporary   = "temporary",
    Permanent   = "permanent",
}

const permitRoutes = new Hono<{ Variables: Variables }>();

/**
 * Read All (search, filter, sort)
 */
permitRoutes.get("/", async (c) => {

    if(!await hasPermission(
        userId(c)!,
        "permit:read",
    )) {
        return error(c, "You do not have access to this operation", 403)
    }

    const orderBy = {} as any;
    const sortBy: string = c.req.query("b") ?? "id";
    const sortOrder: string = c.req.query("o") ?? "desc";
    orderBy[sortBy] = sortOrder;

    const filters:any = {
        deleted: false
    };
    Object.keys(PermitSchema.keyof().Values).forEach(k => {
        const val = c.req.query(k);
        if (val !== undefined) {
            const t = typeof(filters[k]);
            switch(t) {
                case "number":
                case "bigint":
                    filters[k] = Number(val);
                    break;
                case "boolean":
                    filters[k] = val === "true";
                    break;
                case "string":
                    filters[k] = val;
                    break;
                case "object":
                case "undefined":
                    if(["null", "undefined"].includes(val))
                        filters[k] = null;
                    else filters[k] = val;
                break;
            }
        }
    });

    const search = c.req.query("s");
    if(search) {
        filters.OR = [
            {
                reason: {
                    contains: search
                }
            },
            {
                full_name: {
                    contains: search
                }
            },
            {
                justification: {
                    contains: search
                }
            },
            {
                user: {
                    name: {
                        contains: search
                    }
                }
            },
            {
                department: {
                    name: {
                        contains: search
                    }
                }
            },
        ];
    }

    const permits = (await prisma.permit.findMany({
        where: filters,
        orderBy,
        include: {
            user: {
                include: {
                    department: true
                },
            }
        }
    })).map(x => ({ ...x, user: {
        ...x.user,
        //remove for security
        password: undefined,
        refresh_token: undefined
    } }));

    return success(c, permits);
});

/**
 * Read One
 */
permitRoutes.get("/:id{[0-9]+}", async (c) => {
    const permit = await prisma.permit.findUnique({
        where: {
            id: parseInt(c.req.param("id"))
        },
        include: {
            user: {
                include: {
                    department: true
                },
            },
            department: true
        }
    });

    if(!permit) return error(c, "Permit not found", 404);

    // check if this permit is current user's
    const isMine = permit!.user_id == userId(c)!;

    if(!isMine) {
        const hasReadPermission = await hasPermission(
            userId(c)!,
            ["permit:read", "permit:get"], true
        );
        if(!hasReadPermission) return error(c, "You do not have permission to read this permit", 403);
    }

    return success(c, {
        ...permit, user: {
            ...permit.user,
            //remove for security
            password: undefined,
            refresh_token: undefined
        }
    });
});

/**
 * Create
 */
permitRoutes.post("/", async (c) => {
    if(!await hasPermission(
        userId(c)!,
        "permit:create",
    )) {
        return error(c, "You do not have access to this operation", 403)
    }

    const me = (await user(c))!;

    const data:Permit = {
        ... (await c.req.json()),
        department_id: me.department_id,
        full_name: me.name!,
        user_id: userId(c)!,
        approved: null,
        deleted: false
    };
    const parsed = await PermitUncheckedCreateInputSchema.safeParseAsync(data);

    if (!parsed.success) {
        return error(c, parsed.error.issues.findLast(x => x)!.message, 400);
    }

    const permit = await prisma.permit.create({ data: {
        ...parsed.data,
        user_id: userId(c)!
    } });

    return success(c, permit);
});

/**
 * Update
 */
permitRoutes.put("/:id{[0-9]+}", async (c) => {
    const parsed = await PermitUpdateInputSchema.safeParseAsync(await c.req.json());
    
    const isApproving = parsed.data?.approved !== undefined;
    if(isApproving && !await hasPermission(
        userId(c)!,
        "permit:approve",
    )) {
        return error(c, "You do not have access to this operation", 403)
    } else if(isApproving && !parsed.data?.reason) {
        return error(c, "Reason is needed for approval", 400);
    }

    if (!parsed.success) {
        return error(c, parsed.error.issues.findLast(x => x)!.message, 400);
    }

    const permit = await prisma.permit.update({ where: {
        id: parseInt(c.req.param("id"))
    }, data: parsed.data });

    return success(c, permit);
});

/**
 * Delete
 */
permitRoutes.delete("/:id{[0-9]+}", async (c) => {
    if(!await hasPermission(
        userId(c)!,
        "permit:delete",
    )) {
        return error(c, "You do not have access to this operation", 403)
    }

    const permit = await prisma.permit.delete({ where: {
        id: parseInt(c.req.param("id"))
    }});

    return success(c, permit.deleted);
});

/**
 * expiring ids
 */
permitRoutes.get("/expiring", async (c) => {
    if(!await hasPermission(
        userId(c)!,
        "permit:read",
    )) {
        return error(c, "You do not have access to this operation", 403)
    }
    const permits = (await prisma.permit.findMany({
        where: {
            valid_until: {
                lte: addDays(new Date(), 14)
            },
            deleted: false
        },
        include: {
            user: true,
            department: true
        },
        orderBy: {
            id: "desc"
        }
    })).map(x => ({ ...x, user: {
        ...x.user,
        //remove for security
        password: undefined,
        refresh_token: undefined
    } }));

    return success(c, permits);
});

/**
 * Get my permits
 */
permitRoutes.get("/mine", async (c) => {
    const pending = await prisma.permit.findMany({
        where: {
            user_id: userId(c)!,
            approved: null,
            deleted: false
        },
        orderBy: {
            valid_until: "asc"
        }
    });

    const approved = await prisma.permit.findMany({
        where: {
            user_id: userId(c)!,
            approved: true,
            deleted: false
        },
        orderBy: {
            valid_until: "asc"
        }
    });

    const rejected = await prisma.permit.findMany({
        where: {
            user_id: userId(c)!,
            approved: false,
            deleted: false
        },
        orderBy: {
            valid_until: "asc"
        }
    });

    return success(c, { approved, pending, rejected });
});

/**
 * usage by dept
 */
permitRoutes.get("/usage", async (c) => {
    const from = c.req.query("from");
    const to = c.req.query("to");

    let start = new Date();
    let end   = new Date();

    if(!!!from && from != "" && !isNaN(from as any) && isFinite(from as any)) {
        start = new Date(
            parseInt(from!.substring(0, 4)),
            parseInt(from!.substring(4,6)),
            parseInt(from!.substring(6))
        );
    } else {
        start = new Date(
            start.getFullYear(),
            start.getMonth(),
            1
        );
    }
    if(!!!to && to != "" && !isNaN(to as any) && isFinite(to as any)) {
        // default to start of month
        end = new Date(
            parseInt(to!.substring(0, 4)),
            parseInt(to!.substring(4,6)),
            parseInt(to!.substring(6))
        );
    } else {
        // default to end of month
        end = new Date(
            end.getFullYear(),
            end.getMonth() + 1,
            0
        );
    }

    const permits = await prisma.permit.groupBy({
        by: [ "department_id" ],
        where:{
            deleted: false,
            valid_from: { gte: start },
            valid_until: { lte: end }
        },
        _count: {
            id: true
        }
    });

    return success(c, permits);
});

export default permitRoutes;
