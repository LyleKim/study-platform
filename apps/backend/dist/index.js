import { Hono } from 'hono';
import { cors } from 'hono/cors';
import course from './routes/course';
import lecture from './routes/lecture';
import createCourse from './routes/createCourse';
import selectCourse from './routes/selectCourse';
const app = new Hono().use(cors());
const routes = app
    .route('/course', course)
    .route('/lecture', lecture)
    .route('/createCourse', createCourse)
    .route('/selectCourse', selectCourse);
export default app;
