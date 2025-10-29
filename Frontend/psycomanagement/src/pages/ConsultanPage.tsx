import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Footer from "../components/footer/mainFooter";
import SectionConsultant from "../components/consultant/sectionConsultans";
import ConsultantForm from "../components/consultant/consultantForm";
import NewData from "../components/consultant/DataObject";
import SearchIcon from "../assets/search.svg";
import { useState, CSSProperties } from "react";

const ConsultanPage = (): JSX.Element => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const searchIconStyle: CSSProperties = {
    width: "20px",
    height: "20px",
  };

  const [inputValue, setInputValue] = useState("");


  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 mt-24 px-10">
        <Input
          value={inputValue}
          onValueChange={setInputValue}
          color="primary"
          size="sm"
          type="search"
          startContent={<img src={SearchIcon} alt="Search Icon" style={searchIconStyle} />}
          placeholder="Busca tu consultante aquí..."
          label="Encuentra tu consultante más rápido"
          labelPlacement="outside"
        />
      </div>
      <div className="col-span-4 mt-24 px-10"></div>
      <div className="col-span-4 mt-24 px-10 flex justify-center items-center">
        <Button
          color="success"
          className="font-semibold shadow-md shadow-gray-600"
          onPress={onOpen}
        >
          Agregar nuevo consultante
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 w-auto">
                    <h3>Registrar nuevo Consultante</h3>
                  </ModalHeader>
                  <ModalBody>
                    <ConsultantForm onClose={onClose} isNew={true} data={NewData} />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </Button>
      </div>
      <SectionConsultant inputValue={inputValue} />
      <Footer />
    </div>
  );
};

export default ConsultanPage;
