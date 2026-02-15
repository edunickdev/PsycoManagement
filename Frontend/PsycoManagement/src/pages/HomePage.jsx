import React from "react";
import Footer from "../components/organisms/Footer";
import FeatureSection from "../components/organisms/FeatureSection";
import { staticFiles } from "../config/statics";
import Button from "../components/atoms/Button";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-navy-900 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Video with improved overlay */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-30 blur-sm scale-110"
        >
          <source src={staticFiles.shortHome} type="video/mp4" />
        </video>
        
        {/* Animated Orbs for Depth */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[150px] animate-pulse-slow" />

        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/60 to-navy-900" />

        <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Eleva tu práctica <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Psicológica con IA
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed font-light">
            Automatiza tu agenda, analiza expedientes con LectorIA y gestiona tu consultorio de manera inteligente y profesional.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="primary" className="px-10 py-4 text-lg">
              Empezar Ahora
            </Button>
            <Button variant="ghost" className="px-10 py-4 text-lg border border-white/10">
              Con conocer LectorIA
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <section className="relative z-10 -mt-20">
        <FeatureSection />
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
