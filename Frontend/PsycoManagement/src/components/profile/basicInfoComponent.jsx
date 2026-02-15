import React from 'react';
import Input from '../atoms/Input';
import GlassCard from '../atoms/GlassCard';
import Avatar from '../atoms/Avatar';

const BasicInfoSection = ({ myInfo, edit }) => {
  if (!myInfo || !myInfo.data) return null;

  return (
    <GlassCard intensity="medium" className="w-full p-10 border-white/10 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12 relative z-10">
        <div className="flex flex-col items-center space-y-4">
          <Avatar 
            size="xl" 
            name={myInfo.data.names} 
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            className="w-32 h-32 ring-4 ring-primary/20"
          />
          {edit && (
            <button className="text-xs text-primary font-bold hover:underline">
              Cambiar Foto
            </button>
          )}
        </div>

        <div className="flex-1 w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Nombres" 
              value={myInfo.data.names} 
              disabled={!edit}
              className={!edit ? "opacity-90" : ""}
            />
            <Input 
              label="Apellidos" 
              value={myInfo.data.last_names} 
              disabled={!edit}
              className={!edit ? "opacity-90" : ""}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Correo Electrónico" 
              value={myInfo.data.email} 
              disabled={true} // Email usually not editable here
              className="opacity-70"
            />
            <Input 
              label="Especialidad" 
              value="Psicología Clínica" 
              disabled={!edit}
              className={!edit ? "opacity-90" : ""}
            />
          </div>

          <div className="pt-4">
             <p className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-3">Biografía Profesional</p>
             {edit ? (
               <textarea 
                 className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:border-primary/50 outline-none h-32 transition-all"
                 placeholder="Cuéntanos sobre tu experiencia..."
               />
             ) : (
               <p className="text-gray-300 text-sm leading-relaxed font-light italic">
                 "Comprometido con el bienestar emocional y el desarrollo humano a través de la terapia basada en evidencia."
               </p>
             )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default BasicInfoSection;
