import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/auth";
import "../styles/Login.css";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
  
    const isAuthenticated = loginUser(email, password);
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      setError("Account not found. Click Sign Up below.");
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-card">
       
        <h2>Welcome back </h2>
        <p>Please enter your details!</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="alternate-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        
      </div>
       
      
    </div>
  );
};

export default Login;
