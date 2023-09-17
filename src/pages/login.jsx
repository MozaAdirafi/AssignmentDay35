import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../redux/slice/loginSlice";
import { useNavigate } from "react-router";
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUserAsync({ email, password }));
      navigate("/users");
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };
  const dispatch = useDispatch();
  const status = useSelector((state) => state.login.status);
  const error = useSelector((state) => state.login.error);

  return (
    <div className="login-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>
          Welcome Back! <span>Login to your account.</span>
        </h3>

        <label htmlFor="email">Your email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
          required=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="LoginBtn" type="submit">
          Sign In
        </button>

        {status === "succeeded" && (
          <p className="response-message">
            <span className="font-medium">Success alert!</span> Change a few
            things up and try submitting again.
          </p>
        )}
        {status === "failed" && (
          <p className="error-message">
            <span className="font-medium">Danger alert!</span> Change a few
            things up and try submitting again.
          </p>
        )}

      </form>
    </div>
  );
};

export default Login;
