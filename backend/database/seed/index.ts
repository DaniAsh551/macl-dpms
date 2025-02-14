import { PrismaClient } from "@prisma/client";
import { seedDepartments } from "./departments";
import { seedRoles } from "./roles";
import { seedUsers } from "./users";

const prisma = new PrismaClient();

export function getRandom<T>(arr:T[]):T {
    return arr[Math.round(Math.random() * (arr.length - 1))];
}

async function seed() {
    const departments = await seedDepartments(prisma);
    const { roles, permissions } = await seedRoles(prisma);
    const users = await seedUsers(prisma, departments, roles, permissions);

    console.log(`
        Seeded:
        Departments: ${departments.length}
        Roles: ${roles.length}
        Permissions: ${permissions.length}
        Users: ${users.length}
        `);
};

Promise.resolve(seed()).finally(() => {});
