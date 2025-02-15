import { Hono } from "hono";
import { z } from "zod";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import prisma from "../prisma";
import { generateAccessToken, generateRefreshToken } from "../jwt";
import { protectedJwt } from "../middleware/protectedJwt";
import { Variables } from "hono/types";
import { error, success } from "../response";
import { userId } from "../auth";

const authRoutes = new Hono<{ Variables: Variables }>();

authRoutes.post("/login", async (c) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const parsed = schema.safeParse(await c.req.json());

    if (!parsed.success) {
        return error(
            c,
            parsed.error.message,
            400,
            parsed.error.flatten()
        );
    }

    const user = await prisma.user.findUnique({
        where: { email: parsed.data.email },
    });

    if (!user) {
        return error(
            c,
            "Invalid email or password!",
            401
        );
    }

    if (
        !(await Bun.password.verify(
            parsed.data.password,
            user.password,
            "bcrypt"
        ))
    ) {
        return error(
            c,
            "Invalid email or password!",
            401
        );
    }

    const accessToken = await generateAccessToken(user.id);
    const refreshToken = await generateRefreshToken(user.id);

    return success(c, {
        access_token: accessToken,
        refresh_token: refreshToken,
    });
});

authRoutes.post("/refresh", async (c) => {
    const { refresh_token: refreshToken } = await c.req.json();

    if (!refreshToken)
        return c.json(
            { success: false, message: "Missing refresh token" },
            401
        );

    try {
        const { id }: any = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!
        );

        const userExists = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if(!userExists || userExists.id != id)
            return error(c, "Invalid refresh token!", 401);

        const newAccessToken = await generateAccessToken(id);

        return success(c, { accessToken: newAccessToken });
    } catch (error) {
        console.error(error);
        if (error instanceof TokenExpiredError) {
            return c.json(
                { success: false, message: "Refresh token expired" },
                401
            );
        }

        return c.json(
            { success: false, message: "Invalid refresh token" },
            500
        );
    }
});

authRoutes.get("/user", protectedJwt, async (c) => {
    const { password, refresh_token, ...user } = (await prisma.user.findUnique({
        where: { id: userId(c)! },
        include: {
            department: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    }))!;

    const userRoles = await prisma.userRole.findMany({
        where: {
            user_id: userId(c)!
        },
        include: {
            role: {
                include: {
                    role_permissions: {
                        include: {
                            permission: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            },
        }
    });

    const permissions = userRoles.map(role => role.role.role_permissions.map(permission => permission.permission.name)).flat().filter((x,i,a) => a.indexOf(x) === i);
    const roles = userRoles.map(role => role.role.name);

    return success(c, {
        ...user,
        roles,
        permissions
    });
});

export default authRoutes;
