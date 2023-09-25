import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Register";
import Sidebar from "./components/Layout/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Sidebar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
