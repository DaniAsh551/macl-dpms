import { Context, Next } from "hono";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { error as errRes } from "../response";

export const protectedJwt = async (c: Context, next: Next) => {
    const bearerToken = c.req.header("Authorization");

    if (!bearerToken) {
        return errRes(c, "No bearer token", 401);
    }

    const accessToken = bearerToken.split(" ")[1] ?? null;

    if (!accessToken) {
        return errRes(c, "No access token", 401);
    }

    try {
        const { id }: any = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET!
        );

        c.set("userId", id);

        await next();
    } catch (error) {
        console.error(error);

        if (error instanceof JsonWebTokenError) {
            return errRes(c,
                "Invalid access token",
                401
            );
        }

        if (error instanceof TokenExpiredError) {
            return errRes(c,
                "Access token expired",
                401
            );
        }

        return errRes(c,
            "something wrong on server",
            500
        );
    }
};

export default protectedJwt;
