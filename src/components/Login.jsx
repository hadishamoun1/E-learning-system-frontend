import React, { useState } from "react";
import axios from "axios";
import "./styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        user
      );
      console.log(res.data);

      sessionStorage.setItem("token", res.data.token);

      window.location.href = "/classes";
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
