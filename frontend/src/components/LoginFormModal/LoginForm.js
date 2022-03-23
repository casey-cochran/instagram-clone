import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { Link, useHistory } from "react-router-dom";

function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleDemo = async() => {
    await dispatch(sessionActions.login({credential: 'demo@user.io', password: 'password'}))
    history.push('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const value = await dispatch(
      sessionActions.login({ credential, password })
    ).catch(async (res) => {
      const errors = await res.json();
      if (errors) return errors;
    });
    if (value.errors) {
      return setErrors(value.errors);
    }
    history.push("/");
  };

  return (
    <>
      <div className="image-login-cont">
        <p id="newtest"></p>
        <div className="login-cont">
          <div className="center-log">
            <h1 className="login-title">Memories</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder="Username or email"
                required
                className="login-inpt"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="login-inpt"
              />
              <button className="login-btns" type="submit">
                Log In
              </button>
            </form>
            <div>
            <button className="login-btns" onClick={handleDemo} >Demo User</button>
              </div>
          </div>
          <div className="testing-s">
            <p>Don't have an account? <Link id='signup-lnk' to='/signup'>Sign up</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
