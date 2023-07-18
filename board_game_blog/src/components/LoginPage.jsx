import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { googleAuthUrl, login } from "../redux/actions";
import { Button, Container } from "react-bootstrap";
import eyeSlashLogo from '../assets/svgs/eyeSlashLogo.svg';
import eyeLogo from '../assets/svgs/eyeLogo.svg';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLoginWithGoogle = () => {
    dispatch(googleAuthUrl(navigate));
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
              required
              type="email"
              className="form-control shadow mb-3 border border-1 border-dark"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group password-input-group">
            <label>Password:</label>
            <div className="d-flex align-items-center">
            <input
              required
              type={showPassword ? "text" : "password"}
              className="form-control shadow border border-1 border-dark"
              name="password"
              placeholder="Enter your password"
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
        <div className="d-flex align-items-center justify-content-center">
          Or 
          <div className="ms-2 align-items-center google-btn-wrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google-logo" className="google-icon"/>
            <button type="submit" className="btn google-btn" onClick={handleLoginWithGoogle}>Sign in with Google</button>
          </div>
        </div>
      </Container>
    </>
    
  );
};

export default LoginPage;
