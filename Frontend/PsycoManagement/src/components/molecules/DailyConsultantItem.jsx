import React from 'react';
import Avatar from '../atoms/Avatar';

const DailyConsultantItem = ({ consultant }) => {
  return (
    <div className="flex items-center space-x-3 p-3 glass-light rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
      <Avatar name={consultant.names} size="sm" src={`https://i.pravatar.cc/150?u=${consultant.id_consultant}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white truncate group-hover:text-primary transition-colors">
          {consultant.names}
        </p>
        <p className="text-[10px] text-gray-500 font-medium">Próxima sesión: 2:00 PM</p>
      </div>
    </div>
  );
};

export default DailyConsultantItem;
