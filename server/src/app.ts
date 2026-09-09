import express, { type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/user.routes';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true, // 'credentials: true' allows the browser to send and receive http only cookies
  }),
);

app.use(express.json()); // this parses incoming JSON request bodies into req.body

app.use(cookieParser()); // this one parses incoming Cookie headers into req.cookies

app.get('/api/health', (_req: Request, res: Response) => {
  // This is just just a basic health check endpoint to get started with
  res.status(200).json({
    status: 'ok',
    message: 'Bunpo Wizard API is health, Yay! :)',
  });
});

app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
