import express from 'express';
import conn from '../db/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const { email, password } = req.body; // Access the body correctly
    console.log(req.body); // Log the request body

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ loginStatus: false, error: 'Email and password are required.' });
    }

    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    conn.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ loginStatus: false, error: "Query error" });
        }
        
        if (result.length > 0) { // Fixed the typo here
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true }); // Set cookie with httpOnly flag for security
            return res.json({ loginStatus: true });
        } else {
            return res.status(401).json({ loginStatus: false, error: "Wrong email or password" });
        }
    });
});

export { router as adminRouter };