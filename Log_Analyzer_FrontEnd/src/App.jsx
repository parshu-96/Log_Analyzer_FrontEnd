// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const [userRole, setUserRole] = useState(null); // Add this
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<HomePage setUserRole={setUserRole} />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute role={userRole} requiredRole="user">
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role={userRole} requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
