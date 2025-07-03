import { hc } from 'hono/client';
declare const client: {
    courseInfo: {
        title: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    courseInfo: {
        progRate: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: number[];
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
            };
        }>;
    };
} & {
    courseInfo: {
        tdl: import("hono/client").ClientRequest<{
            $get: {
                input: {};
                output: string[];
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
            };
        }>;
    };
} & {
    courseInfo: {
        Addlecture: import("hono/client").ClientRequest<{
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
        }>;
    };
} & {
    courseInfo: {
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
                memo: string;
                url: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
} & {
    lectureMemo: import("hono/client").ClientRequest<{
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
    }>;
};
export type Client = typeof client;
export declare const hcWithType: (...args: Parameters<typeof hc>) => Client;
export {};
//# sourceMappingURL=honoClient.d.ts.map