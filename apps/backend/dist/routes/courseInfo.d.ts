import type { Env } from '~/types/Env';
declare const app: import("hono/hono-base").HonoBase<Env, {
    "/title": {
        $post: {
            input: {
                json: {
                    corId: number;
                };
            };
            output: string;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/progRate": {
        $get: {
            input: {};
            output: number[];
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/tdl": {
        $get: {
            input: {};
            output: string[];
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/Addlecture": {
        $post: {
            input: {
                json: {
                    lecture: {
                        courseId: number;
                        title: string;
                        videoUrl: string;
                    };
                };
            };
            output: "성공적으로 저장했습니다.";
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/getLectureId": {
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
}, "/">;
export default app;
//# sourceMappingURL=courseInfo.d.ts.map