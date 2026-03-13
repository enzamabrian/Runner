import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Pages (no layout)
import Register from "./pages/Register";
import Login from "./pages/Login";
import UsersTable from "./pages/Home";

export default function App() {
  
  return (
    <Router>
      <Routes>
        {/* Public / Auth Routes (No Layout) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UsersTable />} />

      </Routes>       
    </Router>
  );
}
