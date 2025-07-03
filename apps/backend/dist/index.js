import { Hono } from 'hono';
import { cors } from 'hono/cors';
import courseInfo from './routes/courseInfo';
import lectureInfo from './routes/lectureInfo';
import lectureMemo from './routes/lectureMemo';
const app = new Hono().use(cors());
const routes = app
    .route('/courseInfo', courseInfo)
    .route('/lectureInfo', lectureInfo)
    .route('/lectureMemo', lectureMemo);
export default app;
