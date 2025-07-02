import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import { db } from "~/utils/db";
import { courseTable } from "~/schemas/courseTable";
import { count, eq } from "drizzle-orm";
import { lectureTable } from "~/schemas/lectureTable";
let courseTitle;
let total;
let completedCount;
const lectureSchema = z.object({
    courseId: z.number(),
    title: z.string(),
    videoUrl: z.string(),
});
const app = new Hono()
    //TODO: get course title
    .post('/title', zValidator('json', z.object({
    corId: z.number()
})), async (c) => {
    const data = c.req.valid('json');
    //courseTable에서 title 가져오기
    const result = await db.select({
        courseTitle: courseTable.title
    }).from(courseTable)
        .where(eq(courseTable.courseId, data.corId));
    courseTitle = result[0]?.courseTitle ?? "";
    return c.json(courseTitle);
})
    //TODO: get data for calculate progress bar
    .get('/progRate', async (c) => {
    //courseId가 같은 것들 중에서 강의 목록의 총 개수
    const max = await db.select({ total: count() })
        .from(courseTable)
        .innerJoin(lectureTable, eq(courseTable.courseId, lectureTable.courseId));
    //courseId가 같은 것들 중에서, 그 중에서 강의 목록이 학습 완료인 것들의 개수
    const value = await db.select({ completedCount: count() })
        .from(courseTable)
        .innerJoin(lectureTable, eq(courseTable.courseId, lectureTable.courseId))
        .where(eq(lectureTable.isCompleted, true));
    total = max[0]?.total ?? 0;
    completedCount = value[0]?.completedCount ?? 0;
    let result = [total, completedCount];
    return c.json(result);
})
    //TOTO: get a lecture titleList that is a part of course
    .get('/tdl', async (c) => {
    //과목에 맞는 강좌 목록 가져오기
    const titleList = await db.select({ title: lectureTable.title })
        .from(courseTable)
        .innerJoin(lectureTable, eq(courseTable.courseId, lectureTable.courseId));
    let result = titleList.map(item => item.title ?? "");
    return c.json(result);
})
    //TODO: get a lecture data and insert column
    .post('/Addlecture', zValidator('json', z.object({
    lecture: lectureSchema
})), async (c) => {
    const data = c.req.valid('json');
    await db.insert(lectureTable).values({
        courseId: data.lecture.courseId,
        title: data.lecture.title,
        isCompleted: false,
        videoUrl: data.lecture.videoUrl,
        memo: ""
    });
    return c.json("성공적으로 저장했습니다.");
});
export default app;
