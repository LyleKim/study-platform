import { Hono } from 'hono';
import { cors } from 'hono/cors';
import testRoute from './routes/testRoute';
import postTest from './routes/postTest';
const app = new Hono().use(cors());
const routes = app
    .route('/testRoute', testRoute)
    .route('/postTest', postTest);
export default app;
