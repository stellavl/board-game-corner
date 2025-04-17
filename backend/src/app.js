import express from 'express';
import cors from 'cors';
import router from './routes/router.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));

app.use(express.json());
app.use('/api', router);

export default app;
