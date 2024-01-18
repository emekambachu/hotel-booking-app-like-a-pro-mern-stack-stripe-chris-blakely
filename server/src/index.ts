// @ts-nocheck
import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';

mongoose.connect(process.env.MONGODB_URL as string)

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.get('/api/test', async (req: Request, res: Response) => {
//     await res.json({
//         message: 'Hello from express endpoint'
//     });
// });

// Prefix all routes with /api/users
app.use('/api/users', userRoutes);
app.listen(7000, () => {
    console.log('Server running on port 7000');
});