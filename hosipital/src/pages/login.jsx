import axios from 'axios'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

const Login = () => {
  // State for username, password, and remember me
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:3000/api/auth/login " ,{email,password})
      if(response.data.sucess){
        alert("sucessully login")
      }

    } catch(error){
      if(error.response && !error.response.data.sucess){
        setError(error.response.data.error)
      } else
    {
      setError("sever error")
    }}

    // Basic validation
    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    console.log('Logging in with:', { username, password, rememberMe });
    setError('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-container d-flex flex-column align-items-center" style={{ minHeight: '20vh', justifyContent: 'flex-start' }}>
      <h2 className="text-white" style={{ fontSize: '2rem' }}>Employee Management System</h2>
      <div className="border shadow p-4" style={{ width: '100%' }}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error &&<p class name="text-red-500">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="form-label"><strong>Email:</strong></label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3">
          <a href="#" className="text-primary">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;