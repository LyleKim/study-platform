import { Hono } from 'hono';
import { cors } from 'hono/cors';
import testRoute from './routes/testRoute'
import postTest from './routes/postTest'
import userInfo from './routes/userInfo'
import type { Env } from './types/Env'
import lectureInfo from './routes/lectureInfo';
import lectureMemo from './routes/lectureMemo';
import saveCourseInfo from './routes/saveCourseInfo'

const app = new Hono<Env>().use(cors())

const routes = app  
  .route('/testRoute',testRoute)
  .route('/postTest',postTest)
  .route('/userInfo',userInfo)
  .route('/lectureInfo',lectureInfo)
  .route('/lectureMemo',lectureMemo)
  .route('/saveCourseInfo',saveCourseInfo)

export type AppType = typeof routes;

export default app;
