import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import { db } from "~/utils/db";
import { courseTable } from "~/schemas/courseTable";
import { eq } from "drizzle-orm";
import { ca } from "zod/v4/locales";
let courseTitle;
//본 페이지는 화면에서 모든 course를 조회, 수정할 때 사용됩니다.
const app = new Hono()
    //TODO: get course title
    .get('/title', async (c) => {
    const titleList = await db.select({ title: courseTable.title })
        .from(courseTable);
    let result = titleList.map(item => item.title ?? "");
    return c.json(result);
})
    .post('/getID', zValidator('json', z.object({
    title: z.string()
})), async (c) => {
    const data = c.req.valid('json');
    const res = await db.select({ courseID: courseTable.courseId })
        .from(courseTable)
        .where(eq(courseTable.title, data.title));
    let result = res[0]?.courseID ?? -1;
    return c.json(result);
})
    .post('/modifyTitle', zValidator('json', z.object({
    title: z.string(),
    modify: z.string()
})), async (c) => {
    const data = c.req.valid('json');
    await db.update(courseTable)
        .set({ title: data.modify })
        .where(eq(courseTable.title, data.title));
    return c.json({ message: 'successfully update!!' });
})
    .post('/deleteCourse', zValidator('json', z.object({
    title: z.string(),
})), async (c) => {
    const data = c.req.valid('json');
    const res1 = await db.delete(courseTable).where(eq(courseTable.title, data.title));
    return c.json({ message: 'successfully delete!!' });
});
export default app;
