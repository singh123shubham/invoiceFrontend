

// import React, { useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import {RiLoginCircleFill} from 'react-icons/ri'
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "https://invoicemanagementsystemapi-production.up.railway.app/api/v1/user/login/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message);
//       }

//       localStorage.setItem("token", data.token);
//     } catch (error) {
//       toast.error(error.message, { autoClose: 2000 });
//     }
//   };

//   return (
//     <div className="login-container">
//        <form className="login-form" onSubmit={handleLogin}>
//          <div className="login-user-icon">
//            <FaUserCircle />
//          </div>
//          <label htmlFor="email">email:</label>
//          <input
//            type="email"
//           id="email"
//            name="email"
//            value={email}
//            onChange={(event) => setEmail(event.target.value)}
//          />
//          <label htmlFor="password">Password:</label>
//          <input
//           type="password"
//            id="password"
//            name="password"
//            value={password}
//            onChange={(event) => setPassword(event.target.value)}
//          />
//          <button type="submit"> <RiLoginCircleFill/> login </button>
//        </form>
//      </div>
//   );
// }

// export default Login;
import { useState } from 'react';
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import {RiLoginCircleFill} from 'react-icons/ri'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(false);

  const login = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    fetch('https://invoicemanagementsystemapi-production.up.railway.app/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (response.ok) {
          // If login is successful, set loggedin state to true and clear form inputs
          setIsLoggedin(true);
          setEmail('');
          setPassword('');
          toast.success('Login successful!',{
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          // If login fails, display error message
          throw new Error('Login failed.');
        }
      })
      .catch(error => {
        console.error(error);
        toast.error('Error logging in.',{
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  const logout = () => {
    localStorage.removeItem('token-info');
    setIsLoggedin(false);
  };

  return (
    <>
      <div>
        
        {!isLoggedin ? (
          <>
                <div className="login-container">
       <form className="login-form" onSubmit={login}>
         <div className="login-user-icon">
           <FaUserCircle />
         </div>
         <label htmlFor="email">UserName:</label>
         <input
           type="email"
          id="email"
           name="email"
           value={email}
           onChange={(event) => setEmail(event.target.value)}
         />
         <label htmlFor="password">Password:</label>
         <input
          type="password"
           id="password"
           name="password"
           value={password}
           onChange={(event) => setPassword(event.target.value)}
         />
         <button type="submit"> <RiLoginCircleFill/> login </button>
       </form>
     </div>
          </>
        ) : (
          <>
            <h1>User is logged in</h1>
            <button onClickCapture={logout}>Logout user</button>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
