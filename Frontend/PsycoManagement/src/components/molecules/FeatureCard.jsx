import React, { useState } from "react";
import { staticFiles } from "../../config/statics";
import { useNavigate } from "react-router-dom";
import { TherapistAuth } from "../../context/AuthContext";
import GlassCard from "../atoms/GlassCard";
import Button from "../atoms/Button";
import Modal from "../molecules/Modal";

const FeatureCard = ({ data }) => {
  const { user } = TherapistAuth();
  const { subtitle, image, description, title } = data;
  const [isOpen, setIsOpen] = useState(false);
  const route = useNavigate();

  return (
    <>
      <div className="group relative w-64 h-96 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
        <GlassCard className="h-full w-full overflow-hidden p-0 border-white/10 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
          <img
            alt={title}
            className="object-cover h-full w-full opacity-60 group-hover:opacity-80 transition-opacity duration-500"
            src={staticFiles[image]}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-sm font-bold text-white drop-shadow-md leading-tight">
              {subtitle}
            </p>
            <Button 
              variant="glass" 
              className="py-1.5 text-xs w-full border-white/20 active:scale-95"
              onClick={() => setIsOpen(true)}
            >
              Ver más
            </Button>
          </div>
        </GlassCard>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title={title}
        footer={
          <div className="flex space-x-2 w-full justify-between">
             <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cerrar
              </Button>
             {!user && (
              <Button variant="primary" onClick={() => {
                setIsOpen(false);
                route('/auth');
              }}>
                Explorar más
              </Button>
             )}
          </div>
        }
      >
        <p className="leading-relaxed">
          {description}
        </p>
      </Modal>
    </>
  );
};

export default FeatureCard;
