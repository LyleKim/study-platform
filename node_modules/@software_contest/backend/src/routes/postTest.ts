import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import type { Env } from '~/types/Env';

const app = new Hono<Env>()
    .post(
        '/',
        zValidator('json', z.object({ input: z.number() })),
        async (c) => {
            const data = c.req.valid('json');
            const res = `Post value is ${data.input}`;
            return c.json(res);
        }
    );

export default app;
