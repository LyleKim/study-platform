import { hc } from 'hono/client';
declare const client: {
    testRoute: import("hono/client").ClientRequest<{
        $get: {
            input: {};
            output: 10000;
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    }>;
};
export type Client = typeof client;
export declare const hcWithType: (...args: Parameters<typeof hc>) => Client;
export {};
//# sourceMappingURL=honoClient.d.ts.map