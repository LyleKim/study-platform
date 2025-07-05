declare const app: import("hono/hono-base").HonoBase<{}, import("hono/types").BlankSchema, "/">;
declare const routes: import("hono/hono-base").HonoBase<{}, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
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
}, "/course"> | import("hono/types").MergeSchemaPath<{
    "/lectureInfo": {
        $post: {
            input: {
                json: {
                    inputLectureId: string;
                };
            };
            output: {
                courseTitle: string;
                lectureTitle: string;
                lectureId: number;
                memo: string;
                url: string;
                isCompleted: boolean;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/lectureMemo": {
        $post: {
            input: {
                json: {
                    lectureUpdate: {
                        lectureId: number;
                        isCompleted: boolean;
                        memo: string;
                    };
                };
            };
            output: "successfully updated!!";
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/lecture">, "/">;
export type AppType = typeof routes;
export default app;
//# sourceMappingURL=index.d.ts.map