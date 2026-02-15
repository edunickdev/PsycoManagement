import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../atoms/Avatar";
import GlassCard from "../atoms/GlassCard";
import Button from "../atoms/Button";

const ConsultantCard = ({ consultant }) => {
  const navigate = useNavigate();
  const { names, last_names, id_consultant } = consultant;

  return (
    <GlassCard 
      intensity="medium" 
      className="group relative w-full h-[280px] p-6 flex flex-col items-center justify-between border-white/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar 
            name={names} 
            size="xl" 
            src={`https://i.pravatar.cc/150?u=${id_consultant}`}
            className="group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-quinary" />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
            {names}
          </h3>
          <p className="text-sm text-gray-400 font-light">{last_names}</p>
        </div>
      </div>

      <Button
        variant="ghost"
        className="w-full py-2 bg-white/5 border-white/5 group-hover:bg-primary group-hover:text-navy-900 group-hover:border-primary transition-all duration-500"
        onClick={() => navigate(`/consultant/${id_consultant}`)}
      >
        Gestionar
      </Button>
    </GlassCard>
  );
};

export default ConsultantCard;
