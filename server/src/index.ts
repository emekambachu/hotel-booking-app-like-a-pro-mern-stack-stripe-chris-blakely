// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
// @ts-ignore
import bodyParser from 'body-parser';

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

mongoose.connect(MONGODB_URI as string, {
    dbName: MONGODB_DB_NAME
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Prefix all routes with /api/users
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log('Server running on port 7000');
});