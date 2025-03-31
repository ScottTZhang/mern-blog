import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('MongoDB is connected');
})
.catch((err) => {
  console.log(err);
});

const app = express();

app.use(express.json()); // allow json data to be sent to the server

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); // Add this line to use the auth routes