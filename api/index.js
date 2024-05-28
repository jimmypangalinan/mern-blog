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

const app = express();

// allow express to parse incoming json data
app.use(express.json());

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// middleware to handle errors
app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
});
