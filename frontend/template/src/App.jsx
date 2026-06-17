import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Views/Login";
import Home from "./Views/Home";
import Register from "./Views/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import Inventory from "./Views/PersonalInventory";
import NavBar from "./Components/NavBar";
import AllInventory from "./Views/AllInventory";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AllInventory />} />
        <Route
          path="/inventory/:user"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
