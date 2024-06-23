import { MdEdit, MdCancel } from "react-icons/md";
import {Button} from "@nextui-org/react";
import { useState } from "react";
import useFetchInfo from "../services/profile/useFetchInfo";
import BasicInfoComponent from "../components/profile/basicInfoComponent";


const ProfilePage = () => {
  const [edit, setEdit] = useState(false);

  const { myInfo, loading } = useFetchInfo();

  const toggleEdit = () => setEdit(!edit);

  return (
    <>
      <div className="grid grid-cols-12 min-h-screen from-tertiary bg-gradient-to-br bg-slate-100">
        <div className="col-span-1"></div>
        <div className="col-span-10">
          <h1 className="text-5xl text-center mt-32 text-secondary">
            Personaliza aquí tu perfil
          </h1>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1"></div>
        <div className="col-span-4">
          {loading ? "" : <BasicInfoComponent edit={edit} myInfo={myInfo} />}
        </div>
        <div className="col-span-1 pb-10">
          <div className="flex flex-col flex-wrap justify-start md:justify-around md:flex-row">
            <Button onPress={toggleEdit} isIconOnly className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
              <MdEdit className="text-tertiary" />
            </Button>
            <Button onPress={edit == false ? "" : toggleEdit} disabled={edit} isIconOnly className={`${edit ? "bg-secondary" : "bg-tertiary"} h-10 w-10 rounded-full flex items-center justify-center`}>
              <MdCancel className="text-tertiary" />
            </Button>
          </div>
          <h3 className="text-secondary text-center transition-all duration-500 mt-3">{edit == false ? "": "Modo de edición activado"}</h3>
        </div>
        <div className="col-span-5">
          <div className="bg-cuarter rounded-3xl shadow-lg shadow-cuarter flex flex-col py-5 px-10">
            <h3 className="text-3xl py-5 text-center text-tertiary">
              Información de contacto
            </h3>
            <span className="text-xl">Dirección: </span>
            <span className="text-xl">Teléfono: </span>
            <span className="text-xl">Correo electrónico: </span>
          </div>
          <div>
            <div className="p-40 text-center">
              Repositorio de documentos <br />
              ZONA PARA VER LOS DOCUMENTOS SUBIDOS Y SUBIR NUEVOS DOCUMENTOS PENDIENTE DE CONSTRUCCIÓN
              {/* TODO */}
            </div>
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default ProfilePage;
