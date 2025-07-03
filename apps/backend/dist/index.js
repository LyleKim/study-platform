import { Hono } from 'hono';
import { cors } from 'hono/cors';
import userInfo from './routes/userInfo';
<<<<<<< main
import lectureInfo from './routes/lectureInfo';
import lectureMemo from './routes/lectureMemo';
const app = new Hono().use(cors());
const routes = app
    .route('/testRoute', testRoute)
    .route('/postTest', postTest)
    .route('/userInfo', userInfo)
    .route('/lectureInfo', lectureInfo)
    .route('/lectureMemo', lectureMemo);
=======
import courseInfo from './routes/courseInfo';
const app = new Hono().use(cors());
const routes = app
    .route('/userInfo', userInfo)
    .route('/courseInfo', courseInfo);
>>>>>>> main
export default app;
