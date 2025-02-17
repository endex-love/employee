import express from 'express';
import cors from 'cors';
import { adminRouter } from './routes/AdminRoute.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173"], // Removed trailing slash
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}));

app.use(express.json()); // Middleware to parse JSON

app.use('/auth', adminRouter); // Use the admin router for /auth routes

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});  