import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions";
import { Button, Container } from "react-bootstrap";

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
      dispatch(login(formData, navigate));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="p-3 border border-1 rounded-2 border-dark shadow loginContainer">
        <div className="d-flex justify-content-between">
          <h2 className="fw-bold">Login</h2>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control shadow mb-3 border border-1 border-dark"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control shadow border border-1 border-dark"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" className="btn-form btn btn-dark mt-3 shadow fs-5">
            Login
          </Button>
          <p className="mt-4">
            You don't have an account?{" "}
            <Link className="text-decoration-none fw-bold" to="/signUp">
              Register here!
            </Link>
          </p>
        </form>
      </Container>
    </>
    
  );
};

export default LoginPage;
