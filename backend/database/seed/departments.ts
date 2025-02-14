import { PrismaClient } from "@prisma/client";

export async function seedDepartments(prisma:PrismaClient) {
    if((await prisma.department.count()) > 0)
        return await prisma.department.findMany();

    console.info("Seeding Departments");

    const names = [
        "Baggage Handling",
        "Customer Service",
        "Ground Operations",
        "Security",
        "Retail Operations",
        "Food & Beverage",
        "Aircraft Maintenance",
        "Airport Security",
        "Information Technology",
        "Human Resources"
    ];
    const departments = await Promise.all(names
    .map(name => prisma.department.create({
        data: {
            name
        }
     })));

     return departments;
}