import type { Env } from '~/types/Env';
declare const app: import("hono/hono-base").HonoBase<Env, {
    "/": {
        $post: {
            input: {
                json: {
                    lectureId: number;
                    memo: string;
                };
            };
            output: string;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/">;
export default app;
//# sourceMappingURL=lectureMemo.d.ts.map