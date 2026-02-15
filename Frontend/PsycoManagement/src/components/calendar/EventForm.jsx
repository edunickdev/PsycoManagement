import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const EventForm = ({ event, onClose, onSave }) => {
  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(event); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Título" placeholder="Motivo de la consulta" defaultValue={event?.title} />
        <Input label="Fecha" type="date" defaultValue={event ? dayjs(event.start).format('YYYY-MM-DD') : ''} />
      </div>
      <div className="flex justify-end space-x-3 mt-8">
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" type="submit">Guardar Cita</Button>
      </div>
    </form>
  );
};

export default EventForm;
