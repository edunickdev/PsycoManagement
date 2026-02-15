import React, { useEffect, useState } from 'react';
import { TherapistAuth } from '../../context/AuthContext';
import GlassCard from '../atoms/GlassCard';
import Button from '../atoms/Button';
import DailyConsultantItem from '../molecules/DailyConsultantItem';
import { getConsultants } from '../../services/therapist/therapistServices';

const AgendaSidebar = ({ onAddEvent }) => {
  const { getId } = TherapistAuth();
  const id = getId();
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getConsultants(id);
        setConsultants(resp["consultants"] || []);
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };
    if (id) fetchData();
  }, [id]);

  return (
    <GlassCard intensity="medium" className="h-[calc(100vh-160px)] flex flex-col p-4 border-white/10">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-1">Consultantes</h3>
        <p className="text-xs text-gray-400">Pacientes del día</p>
      </div>

      <div className="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-thin">
        {consultants.length > 0 ? (
          consultants.map((c) => (
            <DailyConsultantItem key={c.id_consultant} consultant={c} />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-10">No hay pacientes registrados</p>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Estados</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,213,255,0.5)]" />
              <span className="text-xs text-gray-300">Sesión Confirmada</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_rgba(0,136,204,0.5)]" />
              <span className="text-xs text-gray-300">Pendiente de Pago</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
              <span className="text-xs text-gray-300">En Espera</span>
            </div>
          </div>
        </div>

        <Button 
          variant="primary" 
          className="w-full py-3 text-sm shadow-lg shadow-primary/10"
          onClick={onAddEvent}
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Evento
        </Button>
      </div>
    </GlassCard>
  );
};

export default AgendaSidebar;
