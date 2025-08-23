
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());


app.use(cors({
  origin: "https://todovidya-frontend.vercel.app"
}));
app.get('/', (req, res) => {
  res.send('Hello World!');
});
connectDb();
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
