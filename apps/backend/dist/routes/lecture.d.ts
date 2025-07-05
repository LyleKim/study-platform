import type { Env } from '~/types/Env';
declare const app: import("hono/hono-base").HonoBase<Env, {
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
}, "/">;
export default app;
//# sourceMappingURL=lecture.d.ts.map