import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Singup from "./Pages/Signup";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Singup" element={<Singup />} />
      </Routes>
    </>
  );
};

export default App;
