import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ name: '', email: '', category_id: '' });
    const [editEmployee, setEditEmployee] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch employees on mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Fetch employees from the server
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/auth/employees", { withCredentials: true });
            setEmployees(response.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch employees");
            console.error("Fetch employees error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Add a new employee
    const handleAddEmployee = async (e) => {
        e.preventDefault();
        if (!newEmployee.name || !newEmployee.email || !newEmployee.category_id) {
            setError("All fields are required");
            return;
        }
        try {
            await axios.post("http://localhost:5000/auth/employees", newEmployee, { withCredentials: true });
            setNewEmployee({ name: '', email: '', category_id: '' });
            fetchEmployees();
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || "Failed to add employee");
            console.error("Add employee error:", err);
        }
    };

    // Start editing an employee
    const handleEdit = (employee) => {
        setEditEmployee(employee);
        setNewEmployee({ name: employee.name, email: employee.email, category_id: employee.category_id });
    };

    // Update an employee
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!newEmployee.name || !newEmployee.email || !newEmployee.category_id) {
            setError("All fields are required");
            return;
        }
        try {
            await axios.put(`http://localhost:5000/auth/employees/${editEmployee.id}`, newEmployee, { withCredentials: true });
            setEditEmployee(null);
            setNewEmployee({ name: '', email: '', category_id: '' });
            fetchEmployees();
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update employee");
            console.error("Update employee error:", err);
        }
    };

    // Delete an employee
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await axios.delete(`http://localhost:5000/auth/employees/${id}`, { withCredentials: true });
                fetchEmployees();
                setError('');
            } catch (err) {
                setError(err.response?.data?.error || "Failed to delete employee");
                console.error("Delete employee error:", err);
            }
        }
    };

    return (
        <div className="px-5 mt-5">
            <div className="d-flex justify-content-center">
                <h3>Employee List</h3>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {loading && <p>Loading...</p>}

            {/* Add/Edit Form */}
            <form onSubmit={editEmployee ? handleUpdate : handleAddEmployee} className="mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={newEmployee.email}
                            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Category ID"
                            value={newEmployee.category_id}
                            onChange={(e) => setNewEmployee({ ...newEmployee, category_id: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-success w-100">
                            {editEmployee ? "Update Employee" : "Add Employee"}
                        </button>
                        {editEmployee && (
                            <button
                                type="button"
                                className="btn btn-secondary w-100 mt-2"
                                onClick={() => {
                                    setEditEmployee(null);
                                    setNewEmployee({ name: '', email: '', category_id: '' });
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </form>

            {/* Employee Table */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Category ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.category_id}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(employee)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No employees found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;