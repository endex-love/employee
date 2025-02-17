import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx'; // Ensure this import is correct
import './App.css'; // Use './' to correctly reference the CSS file
import Home from './pages/Home.jsx'; // Ensure this is uncommented
import Employees from './pages/employee.jsx';
import Category from './pages/category.jsx';
import Profile from './pages/Profile.jsx';
import AddCategory from './pages/AddCategory.jsx';

function App() {
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <BrowserRouter>
     <div> <h1 className="text-4xl text-teal-700">Motta General Hospital Employee Management System</h1></div>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/adminlogin" />} />
        <Route path="/auth/adminlogin" element={<Login />} />
        <Route path="/auth/dashboard" element={ <AdminDashboard /> } />
        <Route path='' element={<Home />} />
        <Route path="/auth/employees" element={<Employees />} />
        <Route path="/auth/category" element={<Category />} />
        <Route path="/auth/profile" element={<Profile />} />
        <Route path="/auth/add_category" element={<AddCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;