import React, { useState } from "react";
import Footer from "../components/organisms/Footer";
import ConsultantList from "../components/organisms/ConsultantList";
import Navbar from "../components/organisms/Navbar";
import Input from "../components/atoms/Input";

const ConsultanPage = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen bg-navy-900 pt-32 px-6 md:px-12 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] -z-10" />

      <Navbar />

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-6 md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter">
              Mis <span className="text-primary">Consultantes</span>
            </h1>
            <p className="text-gray-400 text-lg font-light">Gestiona y visualiza la información de tus pacientes</p>
          </div>

          <div className="w-full md:w-80">
            <Input
              placeholder="Buscar consultante..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="glass border-white/10 shadow-xl"
            />
          </div>
        </header>

        <main>
          <ConsultantList inputValue={inputValue} />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ConsultanPage;
