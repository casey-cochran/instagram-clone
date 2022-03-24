import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const value = await dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const errors = await res.json();
        if (errors) return errors;
      });
      if (value?.errors) {
        return setErrors(value.errors);
      }
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ])
  };

  return (
    <>
    <div className="image-login-cont">
      <div className="login-cont">
        <div className="center-log signup">
          <h1 className="login-title signup">Sign Up</h1>
          <p>Sign up to see photos and videos from your friends.</p>
          <form className="login-form signup" onSubmit={handleSubmit}>
            <div>
              {errors.map((error, idx) => (
                <div className="sign-errors" key={idx}>{error}</div>
              ))}
              </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="login-inpt"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              className="login-inpt"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="login-inpt"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm password"
              className="login-inpt"
            />
            <button className="login-btns" type="submit">
              Sign Up
            </button>
          <div className="about-proj">
                <p>This project is a basic CRUD application that
                  is built to resemble Instagram. It contains features such as
                  full crud for posts, comments, and bonus features such as follows, likes, and dislikes.
                </p>
            </div>
          </form>
        </div>
        <div className="testing-s">
            <p>Have an account? <Link id='signup-lnk' to='/login'>Log in</Link></p>
          </div>
      </div>
      </div>
    </>
  );
}

export default SignupFormPage;
