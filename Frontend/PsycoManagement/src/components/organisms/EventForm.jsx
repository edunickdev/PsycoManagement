import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const EventForm = ({ onClose, onRefresh }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for saving event here
    onRefresh && onRefresh();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nombre Consultante" placeholder="Ej: Juan Pérez" />
        <Input label="Nombre Evento" placeholder="Ej: Terapia Cognitiva" />
        <Input label="Empieza" type="datetime-local" />
        <Input label="Termina" type="datetime-local" />
        <Input label="Oficina" placeholder="Ej: Consultorio 4" className="md:col-span-2" />
      </div>

      <div className="flex items-center space-x-2 p-2 bg-white/5 rounded-xl border border-white/5">
        <input type="checkbox" id="pago" className="w-4 h-4 rounded border-white/10 bg-navy-800 text-primary focus:ring-primary" />
        <label htmlFor="pago" className="text-sm text-gray-300">Pago Confirmado</label>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-white/5">
        <Button variant="ghost" onClick={onClose} type="button">
          Cancelar
        </Button>
        <Button variant="primary" type="submit" className="px-8">
          Guardar Cita
        </Button>
      </div>
    </form>
  );
};

export default EventForm;