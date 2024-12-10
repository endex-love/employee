import express from 'express';
import cors from 'cors';
import authRouter from'./routes/auth.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRouter)

const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});