import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    if (usernameRef.current.value.trim().length < 3) {
      alert("Username kamida 3 ta belgidan iborat bo'lishi kerak");
      usernameRef.current.focus();
      usernameRef.current.style.outline = "2px solid red";
      return false;
    } else {
      usernameRef.current.style.outline = "";
    }

    if (!validateEmail(emailRef.current.value)) {
      alert("Emailingiz yaroqsiz");
      emailRef.current.focus();
      emailRef.current.style.outline = "2px solid red";
      return false;
    } else {
      emailRef.current.style.outline = "";
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

  function handleRegister(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          console.log(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.message === "User registered successfully!") {
          navigate("/login");
        } else if (
          data.message === "Failed Username is already in use!" ||
          data.message === "Failed Email is already in use!"
        ) {
          alert(data.message);
        } else {
          alert(
            "Ro'yxatdan o'tishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring."
          );
        }
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
          ref={emailRef}
          type="email"
          placeholder="Enter email"
        />
        <input
          className="border rounded-md p-3"
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
        />
        <button
          className="border rounded-md p-3 bg-blue-500"
          onClick={handleRegister}
        >
          Register
        </button>
        <Link to="/login">loginga otish</Link>
      </form>
    </div>
  );
}

export default Register;
