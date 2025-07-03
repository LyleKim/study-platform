import { Hono } from "hono"
import type { Env } from '~/types/Env';
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import { lectureTable } from "~/schemas/lectureTable";
import { db } from "~/utils/db";
import { eq, and } from "drizzle-orm";

const res1: string = "update memo success"

const app = new Hono<Env>()

.post(
    '/',
    zValidator('json', z.object({lectureId: z.number(), memo: z.string()})),
    async (c) => {
        const data = c.req.valid('json');
        const res = await db
        .update(lectureTable)
        .set({memo: data.memo})
        .where(eq(lectureTable.lectureId, data.lectureId));
        return c.json(res1);
    }
);


export default app;