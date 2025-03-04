import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { adminRouter } from "./routes/AdminRoute.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Updated origin
app.use(cookieParser());

// Routes
app.use("/auth", adminRouter);
console.log("Routes mounted");

// Global error handler
app.use((err, req, res, next) => {
    console.error("Global error:", err.stack);
    res.status(500).json({ status: false, error: "Something went wrong on the server" });
});

// Catch unhandled exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});