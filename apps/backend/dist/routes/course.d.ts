import type { Env } from '~/types/Env';
declare const app: import("hono/hono-base").HonoBase<Env, {
    "/title": {
        $post: {
            input: {
                json: {
                    corId: string;
                };
            };
            output: string;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/allTitle": {
        $get: {
            input: {};
            output: string[];
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/progRate": {
        $post: {
            input: {
                json: {
                    corId: string;
                };
            };
            output: number[];
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/tdl": {
        $post: {
            input: {
                json: {
                    corId: string;
                };
            };
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
                        courseId: string;
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
//# sourceMappingURL=course.d.ts.map