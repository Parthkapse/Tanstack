
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data)

      localStorage.setItem("Token", JSON.stringify(data.accessToken));
      queryClient.invalidateQueries(["user"]); 
      alert("Login Successful!");
      navigate("/dashboard");
    },
    onError: () => {
      
    },
  });

  const handleLogin = (event) => {
    event.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div>
      <h1>Login</h1>
      {mutation.isError && <p style={{ color: "red" }}>Invalid username or password!</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Username :  </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Password : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;