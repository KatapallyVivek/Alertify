import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage({ onLogin, onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert(`Welcome back, ${user.name}!`);
      if (onLogin) onLogin();
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">🚨</div>
        <h2 className="login-title">
          Login to <span>Alertify</span>
        </h2>
        <p className="login-subtitle">Your safety, simplified.</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="signup-link">
          {"Don't have an account?"}{" "}
          <button id="signup"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToSignUp();
            }}
          >
            Sign up
          </button>
          
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
