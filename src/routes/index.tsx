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
import useAuth from "../hooks/useAuth";

const HeaderAndSidebarLayout = () => (
  <div id='page'>
    <Header />
    <Sidebar />
    <Outlet />
  </div>
);

const RoutesApp = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route element={<HeaderAndSidebarLayout/>}>
            <Route path="/home" element={!user ? <Navigate to='/' /> : <Home />} />
            <Route path="/schedules" element={!user ? <Navigate to='/' /> : <Schedules />} />
            <Route path="/profile" element={!user ? <Navigate to='/' /> : <Profile />} />
          </Route>  
          <Route path="/" element={user ? <Navigate to='/home' /> : <Signin />} />
          <Route path="/signup" element={user ? <Navigate to='/home' /> : <Signup />} />
          <Route path="/recovery_password" element={user ? <Navigate to='/home' /> : <RecoveryPassword />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
