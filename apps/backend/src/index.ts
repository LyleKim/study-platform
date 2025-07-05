import { Hono } from 'hono';
import { cors } from 'hono/cors'
import course from './routes/course'
import lecture from './routes/lecture'
import type { Env } from './types/Env'

const app = new Hono<Env>().use(cors())

const routes = app
  .route('/course',course)
  .route('/lecture',lecture)

export type AppType = typeof routes;

export default app;
