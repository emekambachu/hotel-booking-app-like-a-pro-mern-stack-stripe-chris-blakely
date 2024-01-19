// @ts-nocheck
import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import bodyParser from 'body-parser';

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/test', async (req: Request, res: Response) => {
//     await res.json({
//         message: 'Hello from express endpoint'
//     });
// });

// Prefix all routes with /api/users
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log('Server running on port 7000');
});