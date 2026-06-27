import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import errorMiddleware from './middleware/errorMiddleware.js';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_ORIGIN || '*' : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use('/api/tasks', taskRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
