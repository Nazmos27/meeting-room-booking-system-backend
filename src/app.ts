import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://reserve-it-ten.vercel.app'],
    credentials: true,
  }),
);

//application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
