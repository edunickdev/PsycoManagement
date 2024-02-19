/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Checkbox, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import SectionForm from "./SectionForm";
import AutocompleteForm from "./AutoCompleteForm";
import {
  get_annotations_by_consultant,
  saveConsultant,
  updateConsultant,
} from "../../services/consultant/consultantServices";
import AnnotationSection from "./AnnotationSection";

const ConsultantForm = ({ data: myData, onClose, isNew = false }) => {
  const [isEdit, setIsEdit] = useState(isNew ? true : false);
  const [isChild, setIsChild] = useState(myData.isChild);
  const [oldData, setOldData] = useState({});

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (isNew) {
      saveConsultant(data);
    } else {
      updateConsultant(data, oldData);
    }
  };

  // const getAnnotations = (data) => {
  //   console.log("ejecutando");
  //   if (data.annotations > 0) {
  //     const annotations = get_annotations_by_consultant({ data });

  //     return annotations;
  //   } else {
  //     console.log("No tiene anotaciones");
  //     return null;
  //   }
  // };

  

  const allowEdit = async () => {
    onClose;
    setIsEdit(!isEdit);
    setOldData(myData);
  };

  const [selectedTab, setSelectedTab] = useState("info");

  return (
    <form className="grid grid-cols-12" onSubmit={handleSubmit(onSubmit)}>
      <Tabs
        aria-label="clinical history info"
        className="col-span-12 flex justify-center items-center"
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
      >
        <Tab key="info" title="Información básica" className="col-span-12">
          <div className="h-80 overflow-y-auto py-1">
            <SectionForm
              isNew={isNew}
              name={["names", "last_names"]}
              control={control}
              defaultValue={[myData.names, myData.last_names]}
              label={["Nombres", "Apellidos"]}
              error={[errors.names, errors.last_names]}
              isEdit={isEdit}
              amountElements={2}
            />
            <div className="col-span-12 grid grid-cols-12 pt-2 gap-1">
              <SectionForm
                isNew={isNew}
                name={["phone"]}
                control={control}
                defaultValue={[myData.phone]}
                label={["Teléfono"]}
                error={[errors.phone]}
                isEdit={isEdit}
                colSpan={4}
                withWrap={false}
                amountElements={1}
              />
              {!isEdit ? (
                <SectionForm
                  isNew={isNew}
                  name={["type_document"]}
                  control={control}
                  defaultValue={[myData.type_document]}
                  label={["Tipo"]}
                  error={[errors.type_document]}
                  isEdit={isEdit}
                  withWrap={false}
                  colSpan={4}
                  amountElements={1}
                />
              ) : (
                <AutocompleteForm
                  name="type_document"
                  defaultValue={myData.type_document}
                  defaultInputValue={myData.type_document}
                />
              )}
              <SectionForm
                isNew={isNew}
                name={["document_number"]}
                control={control}
                defaultValue={[myData.document_number]}
                label={["Número documento"]}
                error={[errors.document_number]}
                isEdit={isEdit}
                colSpan={4}
                amountElements={1}
                withWrap={false}
              />
            </div>
            <SectionForm
              isNew={isNew}
              name={["email", "address"]}
              control={control}
              defaultValue={[myData.email, myData.address]}
              label={["Correo electrónico", "Dirección"]}
              error={[errors.email, errors.address]}
              isEdit={isEdit}
              amountElements={2}
            />
            <SectionForm
              isNew={isNew}
              name={["city", "country"]}
              control={control}
              defaultValue={[myData.city, myData.country]}
              label={["Ciudad", "País"]}
              error={[errors.city, errors.country]}
              isEdit={isEdit}
              amountElements={2}
            />
            <SectionForm
              isNew={isNew}
              name={["regimen", "eps", "status"]}
              control={control}
              defaultValue={[myData.regimen, myData.eps, myData.status]}
              label={["Regimen", "EPS", "Estatus"]}
              error={[errors.regimen, errors.eps, errors.status]}
              isEdit={isEdit}
              amountElements={3}
            />
            <div className="col-span-12 grid grid-cols-12 mt-3 gap-1">
              <SectionForm
                isNew={isNew}
                name={["birth_date"]}
                control={control}
                defaultValue={[myData.birth_date]}
                label={["Fecha de nacimiento"]}
                error={[errors.birth_date]}
                isEdit={isEdit}
                withWrap={false}
                colSpan={6}
                amountElements={1}
              />
              <div className="col-span-6 flex justify-center items-center">
                <Controller
                  name="isChild"
                  control={control}
                  defaultValue={myData.isChild}
                  render={({ field }) => (
                    <Checkbox
                      defaultSelected={myData.isChild}
                      isDisabled={!isEdit}
                      {...field}
                      onClick={() => {
                        setIsChild(!isChild);
                      }}
                      size="sm"
                      color="primary"
                    >
                      ¿Es menor de edad?
                    </Checkbox>
                  )}
                />
              </div>
            </div>
            {isChild ? (
              <div className="col-span-12 grid grid-cols-12 mt-3 gap-1">
                <SectionForm
                  isNew={isNew}
                  name={["names_responsible"]}
                  control={control}
                  defaultValue={[myData.names_responsible]}
                  label={["Nombres acudiente"]}
                  error={[errors.names_responsible]}
                  isEdit={isEdit}
                  amountElements={1}
                />
                <SectionForm
                  isNew={isNew}
                  name={["phone_responsible", "email_responsible"]}
                  control={control}
                  defaultValue={[
                    myData.phone_responsible,
                    myData.email_responsible,
                  ]}
                  label={["Teléfono acudiente", "Email acudiente"]}
                  error={[errors.phone_responsible, errors.email_responsible]}
                  isEdit={isEdit}
                  amountElements={2}
                />
              </div>
            ) : null}
          </div>
        </Tab>
        {myData.annotations != 0 ? (
          <Tab key="annotations" title="Anotaciones" className="col-span-12">
            <div className="h-80 overflow-y-auto py-1">
              <AnnotationSection />
            </div>
          </Tab>
        ) : null}
      </Tabs>
      {selectedTab != "annotations" ? <div className="col-span-12 flex flex-wrap justify-center item pt-2">
        <Button
          {...(isEdit ? { disabled: false } : { disabled: true })}
          className="mx-1"
          {...(isEdit ? { color: "success" } : { color: "default" })}
          onPress={() => {
            onClose;
          }}
          type="submit"
        >
          Guardar
        </Button>
        {!isNew ? (
          <Button color={isEdit ? "danger" : "primary"} onPress={allowEdit}>
            {isEdit ? "Cancelar" : "Editar"}
          </Button>
        ) : null}
      </div>: <div className="h-12"></div>}
    </form>
  );
};

export default ConsultantForm;
