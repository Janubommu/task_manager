import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import AddTask from "./components/AddTask";
import "./App.css";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // simple toggle state to switch between login/register
  const [showLogin, setShowLogin] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {showLogin ? (
          <>
            <h2>Login</h2>
            <Login onLogin={() => setIsLoggedIn(true)} />
            <p>
              Don’t have an account?{" "}
              <span
                onClick={() => setShowLogin(false)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Register
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <Register onRegister={() => setShowLogin(true)} />
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setShowLogin(true)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Login
              </span>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Task Manager</h1>
      <button onClick={handleLogout} className="btn">Logout</button>
      <Dashboard />
    </div>
  );
};

export default App;
