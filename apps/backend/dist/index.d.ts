declare const app: import("hono/hono-base").HonoBase<{}, import("hono/types").BlankSchema, "/">;
declare const routes: import("hono/hono-base").HonoBase<{}, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
    "/": {
        $get: {
            input: {};
            output: string;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/testRoute"> | import("hono/types").MergeSchemaPath<{
    "/": {
        $post: {
            input: {
                json: {
                    input: number;
                };
            };
            output: string;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/postTest"> | import("hono/types").MergeSchemaPath<{
    "/": {
        $post: {
            input: {
                json: {
                    personInfo: {
                        email: string;
                        id: number;
                        name: string;
                        age: number;
                    };
                };
            };
            output: "데이터 베이스에 insert 성공! localhos:8081을 통해 확인해 보세요!";
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/userInfo">, "/">;
export type AppType = typeof routes;
export default app;
//# sourceMappingURL=index.d.ts.map