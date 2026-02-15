import React, { useEffect, useState } from "react";
import Footer from "../components/organisms/Footer";
import AgendaSidebar from "../components/organisms/AgendaSidebar";
import CustomCalendar from "../components/calendar/Calendar";
import { TherapistAuth } from "../context/AuthContext";
import Navbar from "../components/organisms/Navbar";

const AgendaPage = () => {
  const { user } = TherapistAuth();

  return (
    <div className="min-h-screen bg-navy-900 pt-32 px-6 md:px-12 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] -z-10" />

      <Navbar />

      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter">
            Mi <span className="text-primary">Agenda</span>
          </h1>
          <p className="text-gray-400 text-lg font-light mt-2">Organiza tus sesiones y gestiona tu tiempo efectivamente</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <AgendaSidebar />
          </div>

          {/* Calendar Area */}
          <div className="lg:col-span-9 h-[calc(100vh-160px)]">
            <div className="h-full glass rounded-3xl border-white/10 p-4 shadow-2xl">
              <CustomCalendar />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AgendaPage;
