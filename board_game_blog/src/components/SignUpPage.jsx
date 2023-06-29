import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../redux/actions";

const SignUp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    dispatch(signUp(formData, navigateToLogin));
  };
  
  const navigateToLogin = () => {
    navigate("/");
  };
  

  return (
    <>
      <div className="container mt-4 p-3 border border-3 border-primary rounded-4 shadow">
        <div className="d-flex justify-content-between">
          <h2>Registration</h2>
        </div>
        <form onSubmit={handleRegistrationSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              required
              type="text"
              className="form-control shadow mb-3 border border-2 border-primary"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              required
              type="text"
              className="form-control shadow mb-3 border border-2 border-primary"
              name="firstname"
              placeholder="Enter name"
              value={formData.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Surname:</label>
            <input
              required
              type="text"
              className="form-control shadow mb-3 border border-2 border-primary"
              name="lastname"
              placeholder="Enter surname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              required
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
              required
              type="password"
              className="form-control shadow border border-2 border-primary"
              name="password"
              placeholder="Enter password (at least 8 characters, one digit, one letter, and one special character)"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="btn-form btn btn-primary shadow mt-3"
          >
            SignUp
          </button>
        </form>
        <p className="mt-4">
          Return to{" "}
          <Link className="text-decoration-none fw-bold " to="/">
            Login Page
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;