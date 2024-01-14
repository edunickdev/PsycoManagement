/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SectionForm from "./SectionForm";
import AutocompleteForm from "./AutoCompleteForm";

const ConsultantForm = ({ data, onClose, isNew = false }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChild, setIsChild] = useState(data.isChild);
  const [selected, setSelected] = useState("consultant");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const getAnnotations = () => {
    const annotations = fetch(
      `http://localhost:3000/api/annotations/${data.id_consultant}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());

    return annotations;
  };

  const allowEdit = async () => {
    onClose;
    if (data.annotations > 0) {
      await getAnnotations();
    }
    setIsEdit(!isEdit);
  };

  return (
    <form className="grid grid-cols-12" onSubmit={handleSubmit(onSubmit)}>
      <Tabs
        selectedKey={selected}
        onSelectionChange={setSelected}
        fullWidth
        size="sm"
        aria-label="Tabs form"
        className="col-span-12"
        disabledKeys={isChild ? [] : ["responsible"]}
      >
        <Tab key="consultant" title="Consultante" className="col-span-12">
          <div className="h-80 overflow-y-auto py-1">
            <SectionForm
              isNew={isNew}
              name={["names", "last_names"]}
              control={control}
              defaultValue={[data.names, data.last_names]}
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
                defaultValue={[data.phone]}
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
                  defaultValue={[data.type_document]}
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
                  defaultValue={data.type_document}
                  defaultInputValue={data.type_document}
                />
              )}
              <SectionForm
                isNew={isNew}
                name={["document_number"]}
                control={control}
                defaultValue={[data.document_number]}
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
              defaultValue={[data.email, data.address]}
              label={["Correo electrónico", "Dirección"]}
              error={[errors.email, errors.address]}
              isEdit={isEdit}
              amountElements={2}
            />
            <SectionForm
              isNew={isNew}
              name={["city", "country"]}
              control={control}
              defaultValue={[data.city, data.country]}
              label={["Ciudad", "País"]}
              error={[errors.city, errors.country]}
              isEdit={isEdit}
              amountElements={2}
            />
            <SectionForm
              isNew={isNew}
              name={["regimen", "eps", "status"]}
              control={control}
              defaultValue={[data.regimen, data.eps, data.status]}
              label={["regimen", "eps", "status"]}
              error={[errors.regimen, errors.eps, errors.status]}
              isEdit={isEdit}
              amountElements={3}
            />
            <div className="col-span-12 grid grid-cols-12 mt-3 gap-1">
              <SectionForm
                isNew={isNew}
                name={["birth_date"]}
                control={control}
                defaultValue={[data.birth_date]}
                label={["Fecha de nacimiento"]}
                error={[errors.birth_date]}
                isEdit={isEdit}
                withWrap={false}
                colSpan={6}
                amountElements={1}
              />
              <div className="col-span-6">
                <Controller
                  name="isChild"
                  control={control}
                  defaultValue={data.isChild}
                  render={({ field }) => (
                    <Checkbox
                      defaultSelected={data.isChild}
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
          </div>
        </Tab>
        {isChild ? (
          <Tab key="responsible" title="Responsable" className="col-span-12">
            <div className="col-span-12 grid grid-cols-12 px-1 w-full h-80 content-start">

                <SectionForm
                  isNew={isNew}
                  name={["names_responsible"]}
                  control={control}
                  defaultValue={[data.names_responsible]}
                  label={["Nombres acudiente"]}
                  error={[errors.names_responsible]}
                  isEdit={isEdit}
                  amountElements={1}
                />
              <SectionForm
                isNew={isNew}
                name={["phone_responsible", "email_responsible"]}
                control={control}
                defaultValue={[data.phone_responsible, data.email_responsible]}
                label={["Teléfono acudiente", "Email acudiente"]}
                error={[errors.phone_responsible, errors.email_responsible]}
                isEdit={isEdit}
                amountElements={2}
              />
            </div>
          </Tab>
        ) : null}
        {data.annotations > 0 ? (
          <Tab
            key="annotations"
            title={
              data.annotations === 1
                ? `${data.annotations} Anotación`
                : `${data.annotations} Anotaciones`
            }
            className="col-span-12"
          >
            <div className="col-span-12 grid grid-cols-12 px-1 w-full h-80 content-start"></div>
          </Tab>
        ) : null}
      </Tabs>
      <div className="col-span-12 flex flex-wrap justify-center item pt-2">
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
        <Button color={isEdit ? "danger" : "primary"} onPress={allowEdit}>
          {isEdit ? "Cancelar" : "Editar"}
        </Button>
      </div>
    </form>
  );
};

export default ConsultantForm;
