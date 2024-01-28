/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import  AuthPage  from "../pages/AuthPage";
import  HomePage  from "../pages/HomePage";
import { TherapistAuth } from "../context/AuthContext";
import ConsultanPage from "../pages/ConsultanPage";
import Navbar from "../components/Navbar/mainNavbar";
import AgendaPage from "../pages/AgendaPage";

export const AppRouter = () => {
  const { user } = TherapistAuth();

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/auth" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/consultants" element={
          // <RequireAuth>
            <ConsultanPage />
          // </ RequireAuth>
        } />
        <Route path="/agenda" element={ <AgendaPage />} />
      </Routes>
    </BrowserRouter>
  );
};
