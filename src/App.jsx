import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import UserForm from './UserForm';
import AdminDashboard from './AdminDashboard';
import Home from './Home';
const App = () => {
  return (
    <div>
      <Routes>
        {/* Route for User Submission Form */}
        <Route path='/' element={<Home/>} />
        <Route path="/form" element={<UserForm />} />

        {/* Route for Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
