import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AdminRouter } from './Routes/Admin.js';
import { UniversityRouter } from './Routes/University.js';
import { companyRouter } from './Routes/Company.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser());

// routes
app.use("/Admin", AdminRouter);
app.use("/University",UniversityRouter)
app.use("/Company",companyRouter)

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Success db connection');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Error connecting to db: ' + err);
    });
