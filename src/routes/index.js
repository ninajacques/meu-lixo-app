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
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/schedules" element={<Schedules />} />
            <Route exact path="/profile" element={<Profile />} />
          </Route>  
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/recovery_password" element={<RecoveryPassword />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
