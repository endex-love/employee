import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category.trim()) {
            setError("Category cannot be empty");
            return;
        }

        try {
            // Corrected API endpoint to POST /auth/category
            const response = await axios.post("http://localhost:5000/auth/category", {
                name: category, // Match the expected field in the backend
            }, {
                withCredentials: true, // Send cookies (e.g., JWT token) if authentication is added
            });

            // Handle successful response
            setSuccess(response.data.message || "Category added successfully");
            setError(null);
            setCategory(""); // Clear the input field
            console.log("Category submitted:", response.data);
        } catch (err) {
            // Handle error response with more detail
            setError(err.response?.data?.error || "Failed to add category");
            setSuccess(null);
            console.error("Error adding category:", err.response || err);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center vh-75">
            <div className="p-3 rounded w-25 border">
                <h2 className="text-2xl font-bold mb-4">Add Category</h2>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                            <strong>Category:</strong>
                        </label>
                        <input
                            type="text"
                            id="category"
                            className="form-control rounded"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter category"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0 mb-2">
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;