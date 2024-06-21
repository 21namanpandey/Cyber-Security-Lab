import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnection from "./database/dbConnection.js";
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

dotenv.config({ path: "./config/config.env" });

// Configure CORS
app.use(
    cors({
        origin: [process.env.FRONTEND_URL], // Allow requests from your frontend URL
        methods: ["GET", "POST", "DELETE", "PUT"], // Allow specified HTTP methods
        credentials: true, // Allow cookies and authorization headers
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount user router
app.use("/api/v1/user", userRouter);

// Establish database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
