import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import type { Env } from '~/types/Env';
import { db } from "~/utils/db";
import { courseTable } from "~/schemas/courseTable";
import { desc } from 'drizzle-orm';

const courseSchema = z.object({ 
    title: z.string(),
    goalDate: z.string().transform((str) => new Date(str)),
});

let courseID:number;

const app = new Hono<Env>()
    .post(
        '/',
        zValidator('json', 
            z.object({ 
                courseInfo: courseSchema
            })
        ),

        async (c) => {
            const data = c.req.valid('json');
            
            await db.insert(courseTable).values({
                title: data.courseInfo.title,
                goalDate: data.courseInfo.goalDate,
                createdAt: new Date(),
            });

            const res = await db.select({ courseId: courseTable.courseId })
            .from(courseTable)
            .orderBy(desc(courseTable.courseId))
            .limit(1)

            return c.json(res)
        }
    );

export default app;
