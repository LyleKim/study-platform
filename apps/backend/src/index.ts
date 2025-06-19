import { Hono } from 'hono';
import { cors } from 'hono/cors';
import testRoute from './routes/testRoute'


const app = new Hono()

const routes = app
  .use(cors())
  .route('/testRoute',testRoute)


export type AppType = typeof routes;

export default app;
