import { User } from "@prisma/client";
import { Context } from "hono";
import prisma from "./prisma";

/**
 * Get currently logged in user Id
 * @param ctx 
 * @returns 
 */
export function userId(ctx:Context):number|null{
    return ctx.get("userId") as (number|null);
}

/**
 * Get currently logged in user
 * @param ctx 
 * @returns 
 */
export async function user(ctx:Context):Promise<User|null>{
    const uId = userId(ctx);
    
    return uId != null ? await prisma.user.findUnique({
        where: {
            id: uId!
        }
    }) : null;
}

/**
 * Gets whether the user has given role(s)
 * @param userId 
 * @param role role or roles
 * @param any return true if any of the given roles are present
 * @returns 
 */
export async function hasRole(userId:number, role: string|string[], any: boolean = false):Promise<boolean> {
    const roles = (Array.isArray(role) ? role as string[] : [ role ]);
    const roleIds = (await prisma.role.findMany({
        select: {
            id: true
        },
        where: {
            name: {
                in: roles
            }
        }
    })).map(({id}) => id);

    const userRoleIds = await prisma.userRole.findMany({
        select: {
            role_id: true
        },
        where: {
            user_id: userId,
            role_id: {
                in: roleIds
            }
        }
    });

    return any ? userRoleIds.length > 0 : userRoleIds.length == roles.length; 
}

/**
 * Gets whether the user has given permission(s)
 * @param userId 
 * @param permission permission or permissions
 * @param any return true if any of the given permissions are present
 * @returns 
 */
export async function hasPermission(userId:number, permission: string|string[], any: boolean = false):Promise<boolean> {
    const permissions = (Array.isArray(permission) ? permission as string[] : [ permission ]);
    const permissionIds = (await prisma.permission.findMany({
        select: {
            id: true
        },
        where: {
            name: {
                in: permissions
            }
        }
    })).map(({id}) => id);

    const userPermissions = (await prisma.userPermission.findMany({
        select: {
            permission: {
                select: {
                    name: true
                }
            }
        },
        where: {
            permission_id: {
                in: permissionIds
            }
        }
    })).map(p => p.permission.name);

    // resolve permissions via roles
    const userRolePermissions = (await prisma.userRole.findMany({
        select: {
            role_id: true,
            role: {
                select: {
                    role_permissions: {
                        select: {
                            permission: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        },
        where: {
            user_id: userId,
        }
    })).flatMap(r => r.role.role_permissions.map(p => p.permission.name));

    const allUserPermissions = [ ...userPermissions, ...userRolePermissions ].filter((_,i,a) => a.indexOf(_) == i);
    console.log(permission, allUserPermissions);

    return any ? allUserPermissions.length > 0 : permissions.filter(p => allUserPermissions.includes(p)).length == permissions.length; 
}