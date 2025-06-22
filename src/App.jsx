import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostPage from "./pages/PostPage";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";
import { getUser } from "./utils/auth";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading for 1 second
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Router>
      {loading ? <Loader /> : (
        <>
          <Navbar user={user} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;