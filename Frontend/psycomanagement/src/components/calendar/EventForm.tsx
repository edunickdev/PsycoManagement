import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox } from "@nextui-org/react";

const EventForm: React.FC = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button className="bg-[#004493] text-white" radius="sm" onPress={onOpen}>Agregar Evento</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 bg-blue-50">Crear Evento</ModalHeader>
                            <ModalBody className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input variant="underlined" type="text" label="Nombre Consultante:" size="sm"/>
                                    <Input variant="underlined" type="text" label="Nombre evento:" size="sm"/>
                                </div>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input variant="underlined" type="text" label="Empieza:" size="sm"/>
                                    <Input variant="underlined" type="text" label="Termina:" size="sm"/>
                                </div>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    
                                    <Input variant="underlined" type="text" label="Oficina:"/>
                                </div>
                            </ModalBody>
                            <ModalFooter className="justify-between">
                                <Checkbox>Pago</Checkbox>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button className="btn-download bg-gradient-to-br from-[#004493] to-[#005BC4] text-white" onPress={onClose}>
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default EventForm;