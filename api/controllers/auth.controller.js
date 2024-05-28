
import bcryptjs from 'bcryptjs';

// import User model
import User from '../models/user.model.js';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required' });
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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};