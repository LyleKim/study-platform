import { Hono } from "hono";
const re = 10000;
const app = new Hono()
    .get('/', async (c) => {
    return c.json(re);
});
export default app;
