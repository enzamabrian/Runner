import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Pages (no layout)
import Register from "./pages/Register";


export default function App() {
  
  return (
    <Router>
      <Routes>
        {/* Public / Auth Routes (No Layout) */}
        <Route path="/" element={<Register />} />
      </Routes>       
    </Router>
  );
}
