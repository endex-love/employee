import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null); // State for editing a category
    const [editName, setEditName] = useState(""); // State for the edited name

    // Fetch categories when the component mounts or after CRUD operations
    const fetchCategories = () => {
        axios
            .get("http://localhost:5000/auth/category", { withCredentials: true })
            .then((result) => {
                console.log(result.data);
                setCategories(result.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle Delete
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            axios
                .delete(`http://localhost:5000/auth/category/${id}`, { withCredentials: true })
                .then(() => {
                    fetchCategories(); // Refresh the list
                    console.log(`Category with ID ${id} deleted`);
                })
                .catch((error) => {
                    console.error("Error deleting category:", error);
                });
        }
    };

    // Start Editing
    const handleEdit = (category) => {
        setEditCategory(category);
        setEditName(category.name);
    };

    // Handle Update
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!editName.trim()) {
            alert("Category name cannot be empty");
            return;
        }
        axios
            .put(
                `http://localhost:5000/auth/category/${editCategory.id}`,
                { name: editName },
                { withCredentials: true }
            )
            .then(() => {
                setEditCategory(null); // Exit edit mode
                setEditName(""); // Clear input
                fetchCategories(); // Refresh the list
                console.log(`Category with ID ${editCategory.id} updated`);
            })
            .catch((error) => {
                console.error("Error updating category:", error);
            });
    };

    return (
        <div className="px-5 mt-5">
            <div className="d-flex justify-content-center">
                <h3>Category List</h3>
            </div>
            <Link to="/auth/add_category" className="btn btn-success mb-3">
                Add Category
            </Link>
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td>
                                        {editCategory && editCategory.id === category.id ? (
                                            <form onSubmit={handleUpdate} className="d-flex">
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="form-control me-2"
                                                    required
                                                />
                                                <button type="submit" className="btn btn-primary btn-sm me-2">
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => setEditCategory(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </form>
                                        ) : (
                                            category.name
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(category)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(category.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center">
                                    No categories found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;