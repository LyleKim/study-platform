import { Hono } from "hono";
const re = '$get을 호출한 결과입니다.';
const app = new Hono()
    .get('/', async (c) => {
    return c.json(re);
});
export default app;
