import { Department, Permission, PrismaClient, Role } from "@prisma/client";
import { getRandom } from ".";
import { faker } from "@faker-js/faker";

export async function seedUsers(prisma:PrismaClient, departments:Department[], roles:Role[], permissions: Permission[]) {
    if((await prisma.user.count()) > 0)
        return await prisma.user.findMany();

    console.info("Seeding Users");

    const users = [ await prisma.user.create({
        data: {
            name: "Administrator",
            email: "administrator@gmail.com",
            password: await Bun.password.hash("password", {
                algorithm: "bcrypt",
                cost: 4,
            }),
            department_id: getRandom(departments).id,
            user_roles: {
                create: {
                    role_id: roles[roles.length - 1].id
                }
            }
        },
    }) ];

    await Promise.all([ "Staff", "Security", "Admin" ].map(async r => {
        users.push(await prisma.user.create({
            data: {
                name: r,
                email: `${r.toLocaleLowerCase()}@gmail.com`,
                password: await Bun.password.hash("password", {
                    algorithm: "bcrypt",
                    cost: 4,
                }),
                department_id: getRandom(departments).id,
                user_roles: {
                    create: {
                        role_id: roles.findLast(x => x.name == r.toLocaleLowerCase())!.id
                    }
                }
            },
        }));
    }));

    for (let i = 0; i < 1000; i++) {
        // create a new user
        users.push(await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.exampleEmail(),
                password: await Bun.password.hash("password", {
                    algorithm: "bcrypt",
                    cost: 4,
                }),
                department_id: getRandom(departments).id,
                user_roles: {
                    create: {
                        role_id: getRandom(roles).id
                    }
                }
            },
        }));
    }

    return users;
}