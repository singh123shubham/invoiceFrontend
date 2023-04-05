import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://invoicemanagementsystemapi-production.up.railway.app/api/v1/user/login', { username, password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-user-icon">
          <FaUserCircle />
        </div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
