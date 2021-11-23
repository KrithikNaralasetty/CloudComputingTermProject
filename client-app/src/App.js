import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div>
      <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>    
  );
}

export default App
