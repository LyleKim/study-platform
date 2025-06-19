import { Hono } from 'hono';
declare const app: Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">;
declare const routes: import("hono/hono-base").HonoBase<{}, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
    "/": {
        $get: {
            input: {};
            output: 10000;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/testRoute">, "/">;
export type AppType = typeof routes;
export default app;
//# sourceMappingURL=index.d.ts.map