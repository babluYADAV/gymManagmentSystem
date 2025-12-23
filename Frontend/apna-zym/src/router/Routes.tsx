import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ServicePage from "../pages/ServicePage";
import DetailsPage from "../pages/HomePage/details";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import RegisterSuccess from "../common/RegistrationSuccess";
import VerifyOtp from "../common/VerifyOTP";
import ConfirmPassword from "../common/ConfirmPassword";
import ResetSuccess from "../common/Success";
import CreateProgram from "../pages/Admin/CreateProgram";
import MemberShipPage from "../pages/MemberShipPage";

// Import your page components here

const AppRoutes: React.FC = () => (
  <Router>
    {/* <Header /> */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<DetailsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registrationSuccess" element={<RegisterSuccess />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verifyOTP" element={<VerifyOtp />} />
      <Route path="/confirmPassword" element={<ConfirmPassword />} />
      <Route path="/resetPasswordSuccess" element={<ResetSuccess />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/createProgram" element={<CreateProgram />} />
      <Route path="/membership" element={<MemberShipPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
