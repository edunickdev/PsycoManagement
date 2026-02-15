import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TherapistAuth } from '../../context/AuthContext';
import Button from '../atoms/Button';

const UserSummary = () => {
  const { user, logOut } = TherapistAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate('/auth');
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="border-b border-white/5 pb-2">
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Cuenta</p>
        <p className="text-sm text-white font-medium truncate">{user?.email}</p>
      </div>
      
      <div className="flex flex-col space-y-2">
        <button 
          onClick={() => navigate('/profile')}
          className="text-left text-sm text-gray-300 hover:text-primary transition-colors py-1"
        >
          Ver Perfil
        </button>
        <button 
          onClick={() => navigate('/dashboards')}
          className="text-left text-sm text-gray-300 hover:text-primary transition-colors py-1"
        >
          Configuración
        </button>
      </div>

      <Button variant="outline" className="w-full py-2 text-xs" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </div>
  );
};

export default UserSummary;
