import { Hono } from "hono";
import type { Env } from '~/types/Env';
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import { courseTable } from "~/schemas/courseTable";
import { lectureTable } from "~/schemas/lectureTable";
import { db } from "~/utils/db";
import { eq, and } from "drizzle-orm";

let lectureId:number;



const app = new Hono<Env>()

    .post(
        '/', 
        zValidator('json', z.object({inputLectureId: z.string()})), 
        async (c) => {
            const data = c.req.valid('json');
            lectureId = Number(data.inputLectureId);
            const res = await db
            .select({
                courseTitle: courseTable.title,
                lectureTitle: lectureTable.title,
                lectureId: lectureTable.lectureId,
                url: lectureTable.videoUrl,
                memo: lectureTable.memo,
            })
            .from(lectureTable)
            .innerJoin(courseTable, eq(courseTable.courseId, lectureTable.courseId))
            .where(eq(lectureTable.lectureId, lectureId))
            
            let result = {
                courseTitle: res[0]?.courseTitle ?? "",
                lectureTitle: res[0]?.lectureTitle ?? "",
                lectureId: res[0]?.lectureId??-1,
                memo: res[0]?.memo ?? "",
                url: res[0]?.url ?? ""
            };
            
            return c.json(result);
        } 
    );

export default app;