import { Hono } from 'hono';
const app = new Hono();
app.use('*', async (c, next) => {
    c.header('Access-Control-Allow-Origin', '*');
    c.header('Access-Control-Allow-Headers', 'Content-Type');
    if (c.req.method === 'OPTIONS')
        return c.body(null, { status: 204 });
    await next();
});
app.post('/api/chat', async (c) => {
    const body = await c.req.json();
    const response = await fetch('http://ollama:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body.Query)
    });
    const data = await response.json();
    return c.json(data);
});
export default app;
