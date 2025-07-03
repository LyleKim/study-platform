import { Hono } from 'hono';
import { cors } from 'hono/cors';
import userInfo from './routes/userInfo'
import courseInfo from './routes/courseInfo'
import type { Env } from './types/Env'

const app = new Hono<Env>().use(cors())

const routes = app  
  .route('/userInfo',userInfo)
  .route('/courseInfo',courseInfo)

export type AppType = typeof routes;

export default app;
