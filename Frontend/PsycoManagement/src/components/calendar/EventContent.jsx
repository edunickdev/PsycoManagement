import React from "react";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";

const ContentEventView = ({ selectedEvent, onClose }) => {
  return (
    <div className="flex flex-col items-center space-y-6 py-4">
      <div className="relative">
        <Avatar
          name={selectedEvent?.title || "U"}
          size="lg"
          className="w-24 h-24 border-4 border-primary/20 shadow-2xl shadow-primary/10"
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-navy-900 rounded-full" />
      </div>

      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-white uppercase tracking-tight">
          {selectedEvent?.title}
        </h3>
        <p className="text-sm text-primary font-medium">Paciente Registrado</p>
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 pt-2">
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 uppercase font-bold tracking-tighter">Presencial</span>
            <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 uppercase font-bold tracking-tighter italic">Pendiente Pago</span>
        </div>
      </div>

      <div className="w-full space-y-3 pt-6 border-t border-white/5">
        <Button variant="primary" className="w-full py-3 shadow-lg shadow-primary/10">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Descargar Historia Clínica
        </Button>
        <Button variant="ghost" className="w-full py-3 border border-white/10">
           Editar Detalles del Evento
        </Button>
      </div>
    </div>
  );
}

export default ContentEventView;
