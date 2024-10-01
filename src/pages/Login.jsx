

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigatee = useNavigate();



  function validate() {
    
    if (usernameRef.current.value.trim().length < 3) {
      alert("Username kamida 3 ta belgidan iborat bo'lishi kerak");
      usernameRef.current.focus();
      usernameRef.current.style.outline = "2px solid red";
      return false;
    } else {
      usernameRef.current.style.outline = "";
    }
    if (passwordRef.current.value.trim().length < 4) {
      alert("Parol kamida 4 ta belgidan iborat bo'lishi kerak");
      passwordRef.current.focus();
      passwordRef.current.style.outline = "2px solid red";
      return false;
    } else {
      passwordRef.current.style.outline = "";
    }

    return true; 
  }

  function handleLogin(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value.trim(),
     
      password: passwordRef.current.value.trim(),
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(` ${res.status}`);
          
        }
        return res.json();
      })
      .then((data) => {
        navigatee("/home")
      })
      .catch((err) => {
        console.error(err);
        alert("Mavjud bolgan email yoki username kiritildi ");
      });
  }

  return (
    <div>
      <form className="w-1/4 mt-4 flex flex-col mx-auto rounded-md gap-5 bg-blue-200  p-5">
        <input
          className="border rounded-md p-3"
          ref={usernameRef}
          type="text"
          placeholder="Enter username"
        />
       
        <input
          className="border rounded-md p-3"
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
        />
        <button
          className="border rounded-md p-3 bg-blue-500"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
