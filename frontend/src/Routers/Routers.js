import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import News from "../pages/News";
import NewsDetails from "../pages/NewsDetails";
import NotFound from "../pages/NotFound";
import VehicleDetails from "../pages/VehicleDetails";
import VehicleListing from "../pages/VehicleListing";
import Admin from "../pages/auth/Admin";
import PasswordChange from "../pages/auth/Password";
import UserProfile from "../pages/auth/Profile";
import SignIn from "../pages/auth/Signin";
import SignUp from "../pages/auth/Signup";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" component={SignIn} element={<SignIn />} />
      <Route path="/passwordcg" component={PasswordChange} element={<PasswordChange />} />
      <Route path="/signup" component={SignUp} element={<SignUp />} />
      <Route path="/profile" component={UserProfile} element={<UserProfile />} />
      <Route path="/admin" component={Admin} element={<Admin />} />
      <Route path="/vehicle" element={<VehicleListing />} />
      <Route path="/vehicle/:slug" element={<VehicleDetails />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:slug" element={<NewsDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
