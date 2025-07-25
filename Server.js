import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRouter from './routes/payment.js';

// Load .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/payment', paymentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});