const ProfilePage = () => {
  return (
    <div className="px-40 grid grid-cols-12 h-screen">
      <div className="col-span-12">
        <h1 className="text-4xl text-center mt-36">
          Personaliza aquí tu perfil
        </h1>
      </div>
      <div className="col-span-6">
        <h3>Información básica</h3>
        <div className="flex flex-col w-full p-10 bg-slate-400 rounded-xl">
          <span>Correo electrónico registrado:</span>
          <span>Nombres:</span>
          <span>Apellidos:</span>
        </div>
        <div>
          
        </div>
      </div>
      <div className="col-span-6"></div>
    </div>
  );
};

export default ProfilePage;
