import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ Import Register
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { getUser } from "./utils/auth";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate app-level loading (e.g. fetching user/session data)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      {loading && <Loader />}
      {!loading && (
        <>
          <Navbar user={user} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} /> {/* ✅ Register route */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
