import React from 'react';
import { Link ,Outlet} from 'react-router-dom';
import Home from '../pages/Home.jsx';

const AdminDashboard = () => {
  return (
    <div style={{ height: '100vh', backgroundColor: 'white', color: 'black' }} className="container-fluid mt-4">
      <style>
        {`
          .row {
            display: flex;
            height: 100%; /* Ensure row takes full height */
          }
          .col-auto {
            min-width: 250px; /* Adjust as necessary */
            background-color:rgb(2, 13, 24); /* Dark background for sidebar */
          }
          .bg-light {
            background-color:rgb(2, 10, 17), 10) !important; /* Dark background for sidebar */
            padding: 15px;
            border-right: 1px solidrgb(2, 6, 10); /* Optional border */
          }
          .icon {
            color: white; /* Set icon color to white */
            margin-right: 10px; /* Space between icon and text */
          }
          .list-group-item {
            display: flex;
            align-items: center; /* Center items vertically */
            color: white; /* Text color for list items */
          }
          .list-group-item:hover {
            background-color:rgb(2, 5, 8); /* Darker background on hover */
          }
        `}
      </style>
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 bg-light">
          <h4 className="text-center">Welcome to Motta Hospital</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link to="/auth/dashboard" className="d-flex align-items-center">
                <i className="bi bi-house-door me-2 icon"></i> Dashboard
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/auth/employees" className="d-flex align-items-center">
                <i className="bi bi-person-check me-2 icon"></i>  Employees
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/auth/category" className="d-flex align-items-center">
                <i className="bi bi-tags me-2 icon"></i> Category
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/auth/profile" className="d-flex align-items-center">
                <i className="bi bi-person-circle me-2 icon"></i> Profile
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/auth/logout" className="d-flex align-items-center">
                <i className="bi bi-box-arrow-right me-2 icon"></i> Logout
              </Link>
            </li>
          </ul>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow color: green">
          <h2 > employee managment system</h2>
          <Outlet/>
          </div>
          <div>
            
          </div>
           
          {<Home/>}
          
      
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;