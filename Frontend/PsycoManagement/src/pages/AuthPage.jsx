import React from "react";
import Footer from "../components/organisms/Footer";
import AuthForm from "../components/molecules/AuthForm";
import { staticFiles } from "../config/statics";

const AuthPage = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-navy-900 overflow-hidden">
      {/* Background with gradient and image */}
      <div className="absolute inset-0 z-0">
        <img
          src={staticFiles.fondoLogin}
          alt="Background"
          className="w-full h-full object-cover opacity-20 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/80 to-navy-900" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] z-0 animate-pulse-slow" />

      <main className="relative z-10 w-full px-4 flex justify-center py-20">
        <AuthForm />
      </main>

      <Footer />
    </div>
  );
};

export default AuthPage;
