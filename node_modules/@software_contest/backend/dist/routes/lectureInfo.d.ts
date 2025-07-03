import type { Env } from '~/types/Env';
declare const app: import("hono/hono-base").HonoBase<Env, {
    "/": {
        $post: {
            input: {
                json: {
                    inputCourseId: number;
                    inputLectureId: number;
                };
            };
            output: {
                courseTitle: string | null;
                lectureTitle: string | null;
                lectureId: number;
                url: string | null;
                memo: string | null;
            }[];
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/">;
export default app;
//# sourceMappingURL=lectureInfo.d.ts.map