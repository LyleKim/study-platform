import { Hono } from 'hono';
import { cors } from 'hono/cors';
import userInfo from './routes/userInfo';
import courseInfo from './routes/courseInfo';
const app = new Hono().use(cors());
const routes = app
    .route('/userInfo', userInfo)
    .route('/courseInfo', courseInfo);
export default app;
