/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Checkbox, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SectionForm from "./SectionForm";
import AutocompleteForm from "./AutoCompleteForm";
import { get_annotations } from "../../services/therapist_services";
import AnnotationItem from "./AnnotationItem";

const ConsultantForm = ({ data, onClose, isNew = false }) => {
  const [isEdit, setIsEdit] = useState(isNew ? true : false);
  const [isChild, setIsChild] = useState(data.isChild);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const saveData = (myData) => {
    const response = fetch("http://127.0.0.1:8000/consultants/new-consultant", {
      method: "POST",
      body: JSON.stringify(myData),
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    }).then((response) => response.json());
    return response;
  };

  const updateData = (data) => {
    const response = fetch(
      `http://127.0.0.1:8000/consultants/update-consultant/{}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
      }
    ).then((response) => response.json());
    return response;
  };

  const onSubmit = (data) => {
    console.log(isNew);
    console.log(data);
    if (isNew) {
      saveData(data);
    } else {
      updateData(data);
    }
  };

  const getAnnotations = (data) => {
    console.log("ejecutando");
    if (data.annotations > 0) {
      const annotations = get_annotations({ data });

      return annotations;
    } else {
      console.log("No tiene anotaciones");
      return null;
    }
  };

  const allowEdit = async () => {
    onClose;
    setIsEdit(!isEdit);
  };

  return (
    <form className="grid grid-cols-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="h-80 overflow-y-auto py-1 col-span-12">
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
                defaultValue={[data.birth_date]}
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
            {isChild ? (
              <div className="col-span-12 grid grid-cols-12 mt-3 gap-1">
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
                  defaultValue={[
                    data.phone_responsible,
                    data.email_responsible,
                  ]}
                  label={["Teléfono acudiente", "Email acudiente"]}
                  error={[errors.phone_responsible, errors.email_responsible]}
                  isEdit={isEdit}
                  amountElements={2}
                />
              </div>
            ) : null}
          </div>
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
        {!isNew ? (
          <Button color={isEdit ? "danger" : "primary"} onPress={allowEdit}>
            {isEdit ? "Cancelar" : "Editar"}
          </Button>
        ) : null}
      </div>
    </form>
  );
};

export default ConsultantForm;
