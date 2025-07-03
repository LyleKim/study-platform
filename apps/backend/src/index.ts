import { Hono } from 'hono';
import { cors } from 'hono/cors'
import courseInfo from './routes/courseInfo'
import lectureInfo from './routes/lectureInfo'
import lectureMemo from './routes/lectureMemo'
import type { Env } from './types/Env'

const app = new Hono<Env>().use(cors())

const routes = app
  .route('/courseInfo',courseInfo)
  .route('/lectureInfo', lectureInfo)
  .route('/lectureMemo', lectureMemo)

export type AppType = typeof routes;

export default app;
