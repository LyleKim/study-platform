import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import { courseTable } from "~/schemas/courseTable";
import { lectureTable } from "~/schemas/lectureTable";
import { db } from "~/utils/db";
import { eq, and } from "drizzle-orm";
const app = new Hono()
    .post('/', zValidator('json', z.object({ inputCourseId: z.number(), inputLectureId: z.number() })), async (c) => {
    const data = c.req.valid('json');
    const res = await db
        .select({ courseTitle: courseTable.title, lectureTitle: lectureTable.title, lectureId: lectureTable.lectureId, url: lectureTable.videoUrl, memo: lectureTable.memo })
        .from(courseTable)
        .innerJoin(lectureTable, eq(courseTable.courseId, lectureTable.lectureId))
        .where(and(eq(lectureTable.courseId, data.inputCourseId), eq(lectureTable.lectureId, data.inputLectureId)));
    return c.json(res);
});
export default app;
