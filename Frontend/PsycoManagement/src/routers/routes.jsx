/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import { TherapistAuth } from "../context/AuthContext";
import ConsultanPage from "../pages/ConsultanPage";
import AgendaPage from "../pages/AgendaPage";
import EventForm from "../components/calendar/EventForm";
import Navbar from "../components/navbar/mainNavbar";
import ProfilePage from "../pages/ProfilePage";
import RecoverPage from "../pages/RecoverPage";

export const AppRouter = () => {
  const { user } = TherapistAuth();

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/home" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/auth" element={user ? <HomePage /> : <AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recover" element={<RecoverPage />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/consultants"
          element={
            <RequireAuth>
              <ConsultanPage />
            </RequireAuth>
          }
        />
        <Route
          path="/agenda"
          element={
            <RequireAuth>
              <AgendaPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={user ? <HomePage /> : <AuthPage />} />
        <Route path="/event-form" element={<EventForm />} />
      </Routes>
    </BrowserRouter>
  );
};
