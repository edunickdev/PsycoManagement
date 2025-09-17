import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Avatar, AvatarIcon } from "@nextui-org/react";
import { CalendarDisplayEvent } from "../../types/models";

interface ContentEventViewProps {
  selectedEvent: CalendarDisplayEvent | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ContentEventView = ({ selectedEvent, isOpen, onOpenChange }: ContentEventViewProps): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col"></ModalHeader>
            <ModalBody className="items-center gap-0">
              <Avatar
                icon={<AvatarIcon />}
                classNames={{
                  base: "bg-gradient-to-br from-[#005BC4] to-[#004493]",
                  icon: "text-white/90",
                }}
                size="lg"
              />
              <p className="font-bold ">Andres Leon</p>
              <p>Presencial - Pend Pago</p>
              <span>{selectedEvent?.title}</span>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button className="btn-download bg-gradient-to-br from-[#004493] to-[#005BC4] text-white" onPress={onClose}>
                Descargar HC
              </Button>
              <Button className="btn-close bg-zinc-400 text-white" variant="light">
                Editar Evento
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ContentEventView;
