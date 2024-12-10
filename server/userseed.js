// Import necessary modules
import User from "./modules/user.js"; // Adjust the path as needed
import bcrypt from 'bcrypt';
import connectToDatabase from "./db/db";

// User registration function
const userRegister = async (username, password) => {
    connectToDatabase()
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            role:"admin,employee"
        });

        // Save the new user to the database
        await newUser.save();

        console.log('User registered successfully');
        return { message: 'User registered successfully' };
    } catch (error) {
        console.error('Error registering user:', error.message);
        return { error: error.message };
    }
};

// Example usage
userRegister('newUser', 'userPassword123')
    .then(response => console.log(response))
    .catch(err => console.error(err));