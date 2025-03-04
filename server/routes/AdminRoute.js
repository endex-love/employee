import express from "express";
import conn from "../db/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ status: false, error: "No token provided" });
    }
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: false, error: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

// Admin Login Route
router.post("/adminlogin", (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });
    if (!email || !password) {
        return res.status(400).json({ loginStatus: false, error: "Email and password are required" });
    }
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    conn.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error("Login query error:", err.message);
            return res.status(500).json({ loginStatus: false, error: "Database error: " + err.message });
        }
        console.log("Query result:", result);
        if (result.length > 0) {
            const token = jwt.sign({ role: "admin", email: result[0].email }, "jwt_secret_key", { expiresIn: "1d" });
            res.cookie("token", token, { httpOnly: true });
            return res.json({ loginStatus: true });
        } else {
            return res.status(401).json({ loginStatus: false, error: "Wrong email or password" });
        }
    });
});

// GET /auth/employees - Fetch all employees
router.get("/employees", verifyToken, (req, res) => {
    const sql = "SELECT * FROM emname";
    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Fetch employees error:", err.message);
            return res.status(500).json({ status: false, error: "Error fetching employees: " + err.message });
        }
        res.status(200).json(result);
    });
});

// POST /auth/employees - Add a new employee
router.post("/employees", verifyToken, (req, res) => {
    const { name, email, category_id } = req.body;
    if (!name || !email || !category_id) {
        return res.status(400).json({ status: false, error: "Name, email, and category ID are required" });
    }
    const sql = "INSERT INTO emname (name, email, category_id) VALUES (?, ?, ?)";
    conn.query(sql, [name, email, category_id], (err, result) => {
        if (err) {
            console.error("Add employee error:", err.message);
            return res.status(500).json({ status: false, error: "Error adding employee: " + err.message });
        }
        const newEmployee = { id: result.insertId, name, email, category_id };
        res.status(201).json({ status: true, message: "Employee added successfully", employee: newEmployee });
    });
});

// PUT /auth/employees/:id - Update an employee
router.put("/employees/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { name, email, category_id } = req.body;
    if (!name || !email || !category_id) {
        return res.status(400).json({ status: false, error: "Name, email, and category ID are required" });
    }
    const sql = "UPDATE emname SET name = ?, email = ?, category_id = ? WHERE id = ?";
    conn.query(sql, [name, email, category_id, id], (err, result) => {
        if (err) {
            console.error("Update employee error:", err.message);
            return res.status(500).json({ status: false, error: "Error updating employee: " + err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, error: "Employee not found" });
        }
        res.status(200).json({ status: true, message: "Employee updated successfully" });
    });
});

// DELETE /auth/employees/:id - Delete an employee
router.delete("/employees/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM emname WHERE id = ?";
    conn.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Delete employee error:", err.message);
            return res.status(500).json({ status: false, error: "Error deleting employee: " + err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, error: "Employee not found" });
        }
        res.status(200).json({ status: true, message: "Employee deleted successfully" });
    });
});

// Existing category routes (unchanged)
router.get("/category", verifyToken, (req, res) => {
    const sql = "SELECT * FROM category";
    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Fetch categories error:", err.message);
            return res.status(500).json({ status: false, error: "Error fetching categories: " + err.message });
        }
        res.status(200).json(result);
    });
});

router.post("/category", verifyToken, (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ status: false, error: "Category name is required" });
    }
    const sql = "INSERT INTO category (name) VALUES (?)";
    conn.query(sql, [name], (err, result) => {
        if (err) {
            console.error("Add category error:", err.message);
            return res.status(500).json({ status: false, error: "Error adding category: " + err.message });
        }
        const newCategory = { id: result.insertId, name };
        res.status(201).json({ status: true, message: "Category added successfully", category: newCategory });
    });
});

router.put("/category/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ status: false, error: "Category name is required" });
    }
    const sql = "UPDATE category SET name = ? WHERE id = ?";
    conn.query(sql, [name, id], (err, result) => {
        if (err) {
            console.error("Update category error:", err.message);
            return res.status(500).json({ status: false, error: "Error updating category: " + err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, error: "Category not found" });
        }
        res.status(200).json({ status: true, message: "Category updated successfully" });
    });
});

router.delete("/category/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM category WHERE id = ?";
    conn.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Delete category error:", err.message);
            return res.status(500).json({ status: false, error: "Error deleting category: " + err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, error: "Category not found" });
        }
        res.status(200).json({ status: true, message: "Category deleted successfully" });
    });
});

export { router as adminRouter };