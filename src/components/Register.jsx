import React, { useState } from "react";
import axios from "axios";
import "./styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        newUser
      );
      console.log(res.data);

      // Save the token in session storage
      sessionStorage.setItem("token", res.data.token);

     

     
      // window.location.href = '/dashboard'; // Adjust the URL as needed
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={onSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          required
        />
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
