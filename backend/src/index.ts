import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import authRoutes from "./routes/auth";
import permitRoutes from "./routes/permit";
import { protectedJwt } from "./middleware/protectedJwt";
import departmentRoutes from "./routes/department";
import userRoutes from "./routes/user";

const app = new Hono();

app.use(logger());
app.use(prettyJSON());

app.notFound((c) => c.json({ message: "Not Found", success: false }, 404));

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.route("/api", app.route("/auth", authRoutes));

app.route(
    "/api",
    app
        .use(protectedJwt)
        .route("/user", userRoutes)
        .route("/permit", permitRoutes)
        .route("/department", departmentRoutes)
);

export default app;
