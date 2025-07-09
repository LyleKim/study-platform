import type { Env } from '~/types/Env';
declare const app: import("hono/hono-base").HonoBase<Env, {
    "/title": {
        $get: {
            input: {};
            output: string[];
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/getID": {
        $post: {
            input: {
                json: {
                    title: string;
                };
            };
            output: number;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/modifyTitle": {
        $post: {
            input: {
                json: {
                    title: string;
                    modify: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/deleteCourse": {
        $post: {
            input: {
                json: {
                    title: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/">;
export default app;
//# sourceMappingURL=selectCourse.d.ts.map