import React from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import ConsultantForm from "./consultantForm";

interface Consultant {
  id_consultant: number;
  names: string;
  last_names: string;
  birth_date: string;
  phone: string;
  status: string;
  creation_date: string;
  last_update: string;
  annotations: number;
  isChild: boolean;
}

interface ConsultantItemProps {
  consultant: Consultant;
}

const ConsultantItem: React.FC<ConsultantItemProps> = ({ consultant }) => {

  const initials = consultant.names.split("")[0] + consultant.last_names.split("")[0];
  const age = new Date().getFullYear() - parseInt(consultant.birth_date.split("/")[2]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <Button
      key={consultant.id_consultant}
      className="shadow-sm shadow-gray-600 h-44 w-60 bg-slate-300 grid grid-cols-5 p-2 text-gray-800 hover:shadow-md hover:shadow-gray-600 transition-all duration-300"
      onPress={onOpen}
    >
      <div className="col-span-2 row-span-1 flex items-center justify-center bg-slate-600 w-14 h-14 rounded-lg">
        <span className="text-3xl text-white">{initials}</span>
      </div>
      <div className="col-span-3 flex items-center whitespace-normal">
        <p className="text-small text-start overflow-hidden -ml-6">
          {consultant.names} {consultant.last_names}
        </p>
      </div>
      <div className="col-span-2">
        <p className="text-tiny text-center font-bold">Contacto:</p>
        <p className="text-tiny text-center">{consultant.phone}</p>
      </div>
      <div className="col-span-3">
        <p className="text-tiny font-bold">Edad:</p>
        <p className="text-tiny text-center">{age} años</p>
      </div>
      <div className="col-span-2 text-center">
        <p className="text-tiny font-bold">Status:</p>
        <p className="text-tiny">{consultant.status}</p>
      </div>
      <div className="col-span-3 text-center">
        <p className="text-tiny font-bold">Pagos pendientes: </p>
        <p className="text-tiny">al día</p>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-auto">
                <div className="flex justify-between items-center">
                  <h3>Historia clínica</h3>
                  <div className="flex flex-col">
                    <span className="text-tiny font-bold">Fecha de creación:</span>
                    <span className="text-tiny">{consultant.creation_date}</span>
                    <span className="text-tiny font-bold">Fecha última modificación:</span>
                    <span className="text-tiny">{consultant.last_update}</span>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                  <ConsultantForm data={consultant} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Button>
  );
};

export default ConsultantItem;
