import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() { 
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home></Home>} />

        <Route path="/" element={<Register></Register>} />
        <Route path="/login" element={<Login></Login>} />
      </Routes>
    </div>
  );
}

export default App;
