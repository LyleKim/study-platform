declare const app: import("hono/hono-base").HonoBase<{}, import("hono/types").BlankSchema, "/">;
declare const routes: import("hono/hono-base").HonoBase<{}, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
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
                courseID: number;
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
}, "/lecture"> | import("hono/types").MergeSchemaPath<{
    "/": {
        $post: {
            input: {
                json: {
                    courseInfo: {
                        title: string;
                        goalDate: string;
                    };
                };
            };
            output: {
                courseId: number;
            }[];
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/createCourse"> | import("hono/types").MergeSchemaPath<{
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
}, "/selectCourse">, "/">;
export type AppType = typeof routes;
export default app;
//# sourceMappingURL=index.d.ts.map