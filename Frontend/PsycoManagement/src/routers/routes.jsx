/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import  AuthPage  from "../pages/AuthPage";
import  HomePage  from "../pages/HomePage";
import { TherapistAuth } from "../context/AuthContext";

export const AppRouter = () => {
  const { user } = TherapistAuth();

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/auth" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            // <RequireAuth>
              <HomePage />
            // </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
