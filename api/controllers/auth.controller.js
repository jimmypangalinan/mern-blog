
import bcryptjs from 'bcryptjs';

// import User model
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    };

    const hashedPassword = bcryptjs.hashSync(password, 12);

    // Check if user already exists
    const newUser = new User({ 
        username,
        email, 
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        next(error);
    }

};