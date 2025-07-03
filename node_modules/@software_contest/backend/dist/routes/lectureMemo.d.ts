import type { Env } from '~/types/Env';
declare const app: import("hono/hono-base").HonoBase<Env, {
    "/": {
        $post: {
            input: {
                json: {
                    lectureId: number;
                    memo: string;
                };
            };
            output: [{
                constructor: {
                    name: "ResultSetHeader";
                };
                affectedRows: number;
                fieldCount: number;
                info: string;
                insertId: number;
                serverStatus: number;
                warningStatus: number;
                changedRows: number;
            }, {
                constructor: {
                    name: "FieldPacket";
                };
                catalog: string;
                charsetNr?: number | undefined;
                db?: string | undefined;
                schema?: string | undefined;
                characterSet?: number | undefined;
                decimals: number;
                default?: any;
                flags: number | string[];
                length?: number | undefined;
                name: string;
                orgName: string;
                orgTable: string;
                protocol41?: boolean | undefined;
                table: string;
                type?: number | undefined;
                columnType?: number | undefined;
                zerofill?: boolean | undefined;
                typeName?: string | undefined;
                encoding?: string | undefined;
                columnLength?: number | undefined;
            }[]];
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}, "/">;
export default app;
//# sourceMappingURL=lectureMemo.d.ts.map