import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
    const { employee_id } = useParams(); // Get employee_id from URL
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ name: '', email: '', category_id: '' });
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch employee profile on mount
    useEffect(() => {
        if (employee_id) {
            fetchProfile();
        } else {
            setError("No employee ID provided");
        }
    }, [employee_id]);

    // Fetch employee profile from server
    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/auth/employee/${employee_id}`, { withCredentials: true });
            setProfile({
                name: response.data.name,
                email: response.data.email,
                category_id: response.data.category_id
            });
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch employee profile");
            console.error("Fetch profile error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Update employee profile
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!profile.name || !profile.email || !profile.category_id) {
            setError("All fields are required");
            return;
        }
        try {
            await axios.put(`http://localhost:5000/auth/employee/${employee_id}`, profile, { withCredentials: true });
            setSuccess("Profile updated successfully");
            setError('');
            setEditMode(false);
            fetchProfile(); // Refresh profile data
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update profile");
            setSuccess('');
            console.error("Update profile error:", err);
        }
    };

    return (
        <div className="px-5 mt-5">
            <div className="d-flex justify-content-center">
                <h3>Employee Profile</h3>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            {loading && <p>Loading...</p>}

            <div className="card w-50 mx-auto p-4">
                {editMode ? (
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><strong>Name:</strong></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={profile.name}
                                onChange={handleChange}
                                placeholder="Enter employee name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={profile.email}
                                onChange={handleChange}
                                placeholder="Enter employee email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category_id" className="form-label"><strong>Category ID:</strong></label>
                            <input
                                type="number"
                                id="category_id"
                                name="category_id"
                                className="form-control"
                                value={profile.category_id}
                                onChange={handleChange}
                                placeholder="Enter category ID"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary me-2">Save</button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setEditMode(false);
                                fetchProfile(); // Reset to original data
                                setError('');
                                setSuccess('');
                            }}
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Category ID:</strong> {profile.category_id}</p>
                        <button
                            className="btn btn-warning me-2"
                            onClick={() => setEditMode(true)}
                        >
                            Edit Profile
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/auth/employees')}
                        >
                            Back to Employees
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;