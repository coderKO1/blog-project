import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"; // ✅ Reusing Login styles for consistency

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // ✅ Validate all fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ✅ Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(user => user.email === email);
    if (userExists) {
      setError("Email already in use. Try logging in.");
      return;
    }

    // ✅ Store new user in localStorage
    const newUser = { firstName, lastName, email, password, role: "admin" };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    alert("Account created successfully! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <h2>Create Account </h2>
        <p>Enter your details below!</p>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="submit" className="login-btn">Sign Up</button>
        </form>

        <p className="alternate-link">Already have an account? <Link to="/login">Login</Link></p>
      </div>
      
      
    </div>
  );
};

export default Register;
