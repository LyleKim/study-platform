import { hc } from 'hono/client';
declare const client: {
    userInfo: import("hono/client").ClientRequest<{
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
    }>;
} & {
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
};
export type Client = typeof client;
export declare const hcWithType: (...args: Parameters<typeof hc>) => Client;
export {};
//# sourceMappingURL=honoClient.d.ts.map