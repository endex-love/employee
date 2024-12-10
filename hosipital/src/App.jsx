import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx'; // Make sure this import is correct
import './App.css'; // Use './' to correctly reference the CSS file

function App() {
  return (
    <BrowserRouter>
      <h1 className="text-4xl text-teal-700">Motta General Hospital employee managment system</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;  