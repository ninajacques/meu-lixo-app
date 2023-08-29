import { Fragment } from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import RecoveryPassword from "../pages/RecoveryPassword";
import Schedules from "../pages/Schedules";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import React from "react";

const HeaderAndSidebarLayout = () => (
  <div id='page'>
    <Header />
    <Sidebar />
    <Outlet />
  </div>
);

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route element={<HeaderAndSidebarLayout/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/profile" element={<Profile />} />
          </Route>  
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recovery_password" element={<RecoveryPassword />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
