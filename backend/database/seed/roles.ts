import { Permission, PrismaClient, Role } from "@prisma/client";

export async function seedRoles(prisma:PrismaClient):Promise<{
    roles:Role[],
    permissions: Permission[]

}> {
    if((await prisma.role.count()) > 0) return {
        roles:          await prisma.role.findMany(),
        permissions:    await prisma.permission.findMany(),
    };

    console.info("Seeding Permissions");

    const permissionNames = [
        "permit:approve",
        ...[ "department", "permit", "user" ].
            flatMap(mod => 
                [ "read", "get", "delete" ].map(p => `${mod}:${p}`)
        )
    ];

    const permissions = await Promise.all(permissionNames.map(name => prisma.permission.create({
        data: { name }
    })));

    const perm = (name:string) => permissions.findLast(p => p.name === name);
    
    const roleNames = ["staff", "admin", "security", "superadmin"];
    const rolePerms = {
        staff: [],
        admin: [
            "permit:approve",
            "department:read"
        ],
        security: [
            "permit:read",
            "permit:get",
            "department:read",
        ],
        superadmin: permissionNames
    };

    console.info("Seeding Roles");
    const roles =
        await Promise.all(roleNames.map(name => prisma.role.create({
            data: {
                name,
                role_permissions: {
                    createMany: {
                        data: ((rolePerms as any)[name] as string[]).map(p => ({
                            permission_id: perm(p)!.id
                        }))
                    }
                }
            }
        }))
    );

    return { roles, permissions };
}