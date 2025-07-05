import { Hono } from 'hono';
import { cors } from 'hono/cors';
import course from './routes/course';
import lecture from './routes/lecture';
const app = new Hono().use(cors());
const routes = app
    .route('/course', course)
    .route('/lecture', lecture);
export default app;
