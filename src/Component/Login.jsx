import React, { useState } from "react";
import {loginUser} from "../services/api"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const [error, setError]=useState("");
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser({ username, password });
      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/dashboard")
      alert("Login Successful!");

    
    } catch (error) {
      setError("Invalid username or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
