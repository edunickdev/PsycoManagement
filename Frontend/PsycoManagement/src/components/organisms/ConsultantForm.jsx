import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import GlassCard from '../atoms/GlassCard';

const ConsultantForm = ({ data, onClose, isNew = false }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: data || {}
  });

  const onSubmit = async (formData) => {
    // Implement save logic here
    console.log("Saving consultant data:", formData);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Personal Info */}
        <div className="md:col-span-2 border-b border-white/5 pb-2 mb-2">
           <h4 className="text-sm font-bold text-primary uppercase tracking-widest">Información Personal</h4>
        </div>
        
        <Controller
          name="names"
          control={control}
          rules={{ required: "Requerido" }}
          render={({ field }) => (
            <Input label="Nombres" {...field} error={errors.names?.message} />
          )}
        />
        <Controller
          name="last_names"
          control={control}
          rules={{ required: "Requerido" }}
          render={({ field }) => (
            <Input label="Apellidos" {...field} error={errors.last_names?.message} />
          )}
        />
        <Controller
          name="birth_date"
          control={control}
          render={({ field }) => (
            <Input label="Fecha de Nacimiento" placeholder="DD/MM/AAAA" {...field} />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input label="Teléfono de Contacto" {...field} />
          )}
        />

        {/* Clinical Info */}
        <div className="md:col-span-2 border-b border-white/5 pb-2 mt-4 mb-2">
           <h4 className="text-sm font-bold text-primary uppercase tracking-widest">Información Clínica</h4>
        </div>

        <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Observaciones / Motivo de consulta</label>
            <textarea 
                className="w-full h-32 bg-navy-800/50 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                placeholder="Escribe aquí las notas iniciales..."
            />
        </div>

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col space-y-2">
               <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Estado</label>
               <select {...field} className="bg-navy-800 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:ring-2 focus:ring-primary/50">
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="en espera">En Espera</option>
               </select>
            </div>
          )}
        />
      </div>

      <div className="flex justify-end space-x-4 pt-6 mt-8 border-t border-white/5">
        <Button variant="ghost" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" isLoading={isSubmitting} className="px-10">
          {isNew ? "Registrar Consultante" : "Guardar Cambios"}
        </Button>
      </div>
    </div>
  );
};

export default ConsultantForm;
