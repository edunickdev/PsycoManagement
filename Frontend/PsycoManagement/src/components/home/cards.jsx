/* eslint-disable react/prop-types */
import { Button, Card, CardFooter, Image, ModalFooter, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { staticFiles } from "../../config/statics";
import { useNavigate } from "react-router-dom";
import { TherapistAuth } from "../../context/AuthContext";

const Cards = ({ data }) => {
  const { user } = TherapistAuth();
  const { subtitle, image, description, title } = data;
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const route = useNavigate();

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none shadow-large mx-5"
    >
      <Image
        alt={image}
        className="object-cover h-80 w-60 brightness-75"
        src={staticFiles[image]}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-gray-200 font-bold px-1 text-center">{subtitle}</p>
        <Button className="text-tiny text-white bg-black/20" variant="flat" color="secondary" radius="lg" size="sm" onPress={onOpen}>
          Ver más
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p> 
                  {description}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                {!user ? <Button color="success" onPress={() => {
                  onClose
                  route('/auth')
                }}>
                  Explorar más
                </Button> : null}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </CardFooter>
    </Card>
  );
};

export default Cards;
