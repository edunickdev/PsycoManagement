import React, { useState } from "react";
import { MdEdit, MdCancel, MdSave } from "react-icons/md";
import useFetchInfo from "../services/profile/useFetchInfo";
import BasicInfoSection from "../components/profile/basicInfoComponent";
import Footer from "../components/organisms/Footer";
import Button from "../components/atoms/Button";
import GlassCard from "../components/atoms/GlassCard";

const ProfilePage = () => {
  const [edit, setEdit] = useState(false);
  const { myInfo, loading } = useFetchInfo();

  const toggleEdit = () => setEdit(!edit);

  return (
    <div className="min-h-screen bg-navy-900 pt-32 px-6 md:px-12 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-6 md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter">
              Mi <span className="text-primary">Perfil</span>
            </h1>
            <p className="text-gray-400 text-lg font-light">Gestiona tu información personal y profesional</p>
          </div>

          <div className="flex space-x-3">
             <Button 
                variant={edit ? "primary" : "outline"} 
                className="px-6"
                onClick={toggleEdit}
             >
                {edit ? <><MdSave className="mr-2" /> Guardar</> : <><MdEdit className="mr-2" /> Editar Perfil</>}
             </Button>
             {edit && (
               <Button variant="ghost" className="border border-white/10" onClick={toggleEdit}>
                 <MdCancel className="mr-2" /> Cancelar
               </Button>
             )}
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="w-full h-80 flex flex-col items-center justify-center space-y-4">
                 <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                 <p className="text-gray-500 text-sm italic">Cargando información...</p>
              </div>
            ) : (
              <BasicInfoSection edit={edit} myInfo={myInfo} />
            )}
          </div>

          {/* Right Column - Secondary Info */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard intensity="low" className="p-8 border-white/5 h-full">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">
                Información de contacto
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1">Dirección</p>
                  <p className="text-gray-300 font-light italic">No especificada</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1">Teléfono</p>
                  <p className="text-gray-200">Próximamente</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1">Backup Email</p>
                  <p className="text-gray-200">{myInfo?.data?.email}</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard intensity="high" className="p-8 border-primary/20 bg-primary/5">
              <h4 className="text-sm font-bold text-white mb-2">Repositorio de Documentos</h4>
              <p className="text-xs text-gray-400 mb-4 font-light leading-relaxed">
                Próximamente podrás subir tu tarjeta profesional y documentos de certificación aquí.
              </p>
              <div className="w-full h-24 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center grayscale opacity-50">
                <span className="text-xs text-gray-500">Zona de carga bloqueada</span>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
