import { Hono } from 'hono';
import { cors } from 'hono/cors';
import testRoute from './routes/testRoute';
import postTest from './routes/postTest';
import userInfo from './routes/userInfo';
const app = new Hono().use(cors());
const routes = app
    .route('/testRoute', testRoute)
    .route('/postTest', postTest)
    .route('/userInfo', userInfo);
export default app;
