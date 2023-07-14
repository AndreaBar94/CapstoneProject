import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../redux/actions";
import { Button, Container } from "react-bootstrap";
import TermsModal from "./TermsModal";
import eyeSlashLogo from '../assets/svgs/eyeSlashLogo.svg';
import eyeLogo from '../assets/svgs/eyeLogo.svg';

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

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTermsCheckboxChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    dispatch(signUp(formData, navigateToLogin));
  };
  
  const navigateToLogin = () => {
    navigate("/");
  };
  
  const openTermsModal = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };


  return (
    <>
      <Container className="mt-5 p-3 border border-1 rounded-2 border-dark shadow signUpContainer">
        <div className="d-flex justify-content-between">
          <h2 className="fw-bold">Registration</h2>
        </div>
        <form onSubmit={handleRegistrationSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              required
              type="text"
              className="form-control shadow mb-3 border border-1 border-dark"
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
              className="form-control shadow mb-3 border border-1 border-dark"
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
              className="form-control shadow mb-3 border border-1 border-dark"
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
              className="form-control shadow mb-3 border border-1 border-dark"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group password-input-group">
            <label>Password:</label>
            <div className="d-flex align-items-center mb-3">
              <input
                required
                type={showPassword ? "text" : "password"}
                className="form-control shadow border border-1 border-dark"
                name="password"
                placeholder="Enter password (at least 8 characters, one digit, one letter, and one special character)"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 
                <img src={eyeSlashLogo} alt="eye-slash-logo" />
                : 
                <img src={eyeLogo} alt="eye-logo" />
                }
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={termsAccepted}
                onChange={handleTermsCheckboxChange}
                className="me-2"
                required
              />
              I accept the{" "}
              <Button variant="link" className="ps-0" onClick={openTermsModal}>
                Terms and Conditions.
              </Button>
            </label>
          </div>
          <Button
            type="submit"
            className="btn-form btn btn-dark mt-3 shadow fs-5"
          >
            SignUp
          </Button>
        </form>
        <p className="mt-4">
          Return to{" "}
          <Link className="text-decoration-none fw-bold " to="/">
            Login Page
          </Link>
        </p>
      </Container>

      <TermsModal show={showTermsModal} handleClose={closeTermsModal} />

    </>
  );
};

export default SignUp;