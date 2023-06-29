import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(login(formData, navigate)); // Chiamata all'azione login con i dati del modulo
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4 p-3 border border-3 border-primary rounded-4 shadow">
      <div className="d-flex justify-content-between">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control shadow mb-3 border border-2 border-primary"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control shadow border border-2 border-primary"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn-form btn btn-primary mt-3 shadow">
          Login
        </button>
        <p className="mt-4">
          You don't have an account?{" "}
          <Link className="text-decoration-none fw-bold" to="/SignUp">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
