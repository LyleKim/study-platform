import type { Env } from '~/types/Env';
declare const app: import("hono/hono-base").HonoBase<Env, {
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
}, "/">;
export default app;
//# sourceMappingURL=userInfo.d.ts.map