import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Users from "./pages/users";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />}/>
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
