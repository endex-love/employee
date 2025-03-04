import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = values;

        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        setLoading(true);

        try {
            console.log("Sending login request to:", "http://localhost:5000/auth/adminlogin", values);
            const response = await axios.post("http://localhost:5000/auth/adminlogin", values);
            console.log("Login response:", response.data);
            
            if (response.data.loginStatus) {
                navigate('/auth/dashboard');
            } else {
                setError(response.data.error || "Login failed.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Server error";
            setError(errorMessage);
            console.error("Login error details:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                config: error.config, // Log request config
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container d-flex flex-column align-items-center" style={{ minHeight: '20vh', justifyContent: 'flex-start' }}>
            <h2 className="text-white" style={{ fontSize: '2rem' }}>Employee Management System</h2>
            <div className="border shadow p-4" style={{ width: '100%' }}>
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && <p className="text-danger">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label"><strong>Password:</strong></label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            className="form-check-input"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe" className="form-check-label">Remember Me</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="mt-3">
                    <a href="#" className="text-primary">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;