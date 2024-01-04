/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";

const ConsultantItem = ({ consultant = [] }) => {
  return (
    <Button
      key={consultant.id_consultant}
      className="shadow-sm shadow-gray-600 h-44 w-60 bg-slate-300 grid grid-cols-5 p-2 text-gray-800 hover:shadow-md hover:shadow-gray-600 transition-all duration-300"
    >
      <div className="col-span-2 row-span-1 flex items-center justify-center bg-slate-600 w-14 h-14 rounded-lg">
        <span className="text-3xl text-white">JM</span>
      </div>
      <div className="col-span-3 flex items-center whitespace-normal">
        <p className="text-small text-start overflow-hidden -ml-6">
          Eduard Nicolás Sarmiento Herrera
        </p>
      </div>
      <div className="col-span-2">
        <p className="text-tiny text-center font-bold">Contacto:</p>
        <p className="text-tiny text-center">3115833055</p>
      </div>
      <div className="col-span-3">
        <p className="text-tiny font-bold">Edad:</p>
        <p className="text-tiny text-center">32 años</p>
      </div>
      <div className="col-span-2 text-center">
        <p className="text-tiny font-bold">Status:</p>
        <p className="text-tiny">Activo</p>
      </div>
      <div className="col-span-3 text-center">
        <p className="text-tiny font-bold">Pagos pendientes: </p>
        <p className="text-tiny">al día</p>
      </div>
    </Button>
  );
};

export default ConsultantItem;
