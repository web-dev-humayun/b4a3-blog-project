import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import BookRouter from './app/modules/book/book.route';
import orderRouter from './app/modules/order/order.route';
const app = express();
// const port = 3000
app.use(cors());
//parser
app.use(express.json());
app.use('/api/products', BookRouter);
app.use('/api/orders', orderRouter);



app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Book-Shop Server Is Running ',
  });
});

//custom error handler

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Something went wrong',
  });
});

//global error handler

interface ErrorWithStatus extends Error {
  status?: number;
}

app.use(
  (error: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    if (error) {
      res.status(400).json({
        success: false,
        message:'Something went wrong',
      });
    } else {
      next();
    }
  },
);

export default app;
