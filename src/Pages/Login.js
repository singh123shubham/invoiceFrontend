import React from "react";
import { FaUserCircle } from "react-icons/fa";

function Login() {
  return (
    <div className="login-container">
      <form className="login-form">
        <div className="login-user-icon">
            <FaUserCircle/>
        </div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
