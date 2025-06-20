import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader"; // ✅ Import the loader

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { getUser } from "./utils/auth";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate app-level loading (like fetching user data or assets)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Router>
      {loading && <Loader />} {/* 🔁 Show while loading */}
      {!loading && (
        <>
          <Navbar user={user} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other routes as needed */}
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
