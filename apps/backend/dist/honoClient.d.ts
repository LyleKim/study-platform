import { hc } from 'hono/client';
declare const client: {
    course: {
        title: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    course: {
        allTitle: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: string[];
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
            };
        }>;
    };
} & {
    course: {
        progRate: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    course: {
        tdl: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    course: {
        Addlecture: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    course: {
        getLectureId: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    course: {
        modifyTitle: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    course: {
        deleteCourse: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    lecture: {
        lectureInfo: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    lecture: {
        lectureMemo: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    createCourse: import("hono/client").ClientRequest<{
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
    }>;
} & {
    selectCourse: {
        title: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: string[];
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
            };
        }>;
    };
} & {
    selectCourse: {
        getID: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    selectCourse: {
        modifyTitle: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    selectCourse: {
        deleteCourse: import("hono/client").ClientRequest<{
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
        }>;
    };
};
export type Client = typeof client;
export declare const hcWithType: (...args: Parameters<typeof hc>) => Client;
export {};
//# sourceMappingURL=honoClient.d.ts.map