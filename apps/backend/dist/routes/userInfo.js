import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "~/utils/zValidator-wrapper";
import { number, string } from "zod/v4";
import { db } from "~/utils/db";
import { usersTable } from "~/schemas/lectureStatus";
//객체를 넘겨서 받고 싶다면
const personSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.number(),
    email: z.string()
});
const app = new Hono()
    .post('/', zValidator('json', z.object({
    personInfo: personSchema
})), async (c) => {
    const data = c.req.valid('json');
    await db.insert(usersTable).values({
        id: data.personInfo.id,
        name: data.personInfo.name,
        age: data.personInfo.age,
        email: data.personInfo.email
    });
    return c.json('데이터 베이스에 insert 성공! localhos:8081을 통해 확인해 보세요!');
});
export default app;
