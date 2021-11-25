import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CreateEvent1 from "./pages/CreateEvent1"
import CreateEvent2 from "./pages/CreateEvent2"

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
          <li>
            <Link to="/create-event-1">Create-Event-1</Link>
          </li>
          <li>
            <Link to="/create-event-2">Create-Event-2</Link>
          </li>
        </ul>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event-1" element={<CreateEvent1 />} />
        <Route path="/create-event-2" element={<CreateEvent2 />} />
      </Routes>
    </div>    
  );
}

export default App
