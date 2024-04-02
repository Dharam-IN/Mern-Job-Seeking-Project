import express from "express";
import {config} from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js';
import jobRouter from './routes/jobRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import {dbConnection} from './database/dbConnection.js';
import {errorMiddleware} from './middlewares/error.js';

config({path: './config/config.env'});

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}))
// app.use(cors())

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

dbConnection()

app.use(errorMiddleware)

export default app;
