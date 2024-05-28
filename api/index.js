import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// routes
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Middleware and routes (optional, add as needed)

const app = express();

// allow express to parse incoming json data
app.use(express.json());

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
