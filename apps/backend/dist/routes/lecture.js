import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import { courseTable } from "~/schemas/courseTable";
import { db } from "~/utils/db";
import { eq, and } from "drizzle-orm";
import { lectureTable } from "~/schemas/lectureTable";
let lectureId;
const lectureSchema = z.object({
    lectureId: z.number(),
    memo: z.string(),
    isCompleted: z.boolean()
});
const app = new Hono()
    .post('/lectureInfo', zValidator('json', z.object({ inputLectureId: z.string() })), async (c) => {
    const data = c.req.valid('json');
    lectureId = Number(data.inputLectureId);
    const res = await db
        .select({
        courseTitle: courseTable.title,
        lectureTitle: lectureTable.title,
        lectureId: lectureTable.lectureId,
        courseID: lectureTable.courseId,
        url: lectureTable.videoUrl,
        memo: lectureTable.memo,
        isCompleted: lectureTable.isCompleted
    })
        .from(lectureTable)
        .innerJoin(courseTable, eq(courseTable.courseId, lectureTable.courseId))
        .where(eq(lectureTable.lectureId, lectureId));
    let result = {
        courseTitle: res[0]?.courseTitle ?? "",
        lectureTitle: res[0]?.lectureTitle ?? "",
        lectureId: res[0]?.lectureId ?? -1,
        courseID: res[0]?.courseID ?? -1,
        memo: res[0]?.memo ?? "",
        url: res[0]?.url ?? "",
        isCompleted: res[0]?.isCompleted ?? false
    };
    return c.json(result);
})
    .post('/lectureMemo', zValidator('json', z.object({
    lectureUpdate: lectureSchema
})), async (c) => {
    const data = c.req.valid('json');
    await db.update(lectureTable)
        .set({
        memo: data.lectureUpdate.memo,
        isCompleted: data.lectureUpdate.isCompleted
    })
        .where(eq(lectureTable.lectureId, data.lectureUpdate.lectureId));
    return c.json('successfully updated!!');
});
export default app;
