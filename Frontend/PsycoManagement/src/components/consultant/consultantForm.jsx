/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Autocomplete, AutocompleteItem, Button, Checkbox, Input, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const ConsultantForm = ({ data, onClose, isNew = false }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChild, setIsChild] = useState(data.isChild);
  const [selected, setSelected] = useState("consultant");
  const listTD = ["CC", "TI", "CE", "PA", "RC", "NIT", "RUT", "DNI"];

  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const getAnnotations = () => {
    const annotations = fetch(`http://localhost:3000/api/annotations/${data.id_consultant}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

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
            <div className="col-span-12 grid grid-cols-12 w-full gap-1">
              <div className="col-span-6">
                <Controller
                  name="names"
                  control={control}
                  defaultValue={isNew ? `${data.names}` : ""}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      placeholder="Nombres"
                      label="Nombres"
                      labelPlacement="outside"
                      error={errors.names}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-span-6">
                <Controller
                  name="last_names"
                  control={control}
                  defaultValue={data.last_names}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="Apellidos"
                      labelPlacement="outside"
                      error={errors.last_names}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12 pt-2 gap-1">
              <div className="col-span-4">
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={data.phone}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="Teléfono"
                      labelPlacement="outside"
                      error={errors.phone}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-span-3">
                <Controller
                  name="type_document"
                  control={control}
                  defaultValue={data.type_document}
                  render={({ field }) =>
                    isEdit ? (
                      <Autocomplete
                        {...field}
                        size="sm"
                        label="Tipo"
                        color="primary"
                        labelPlacement="outside"
                        defaultInputValue={data.type_document}
                      >
                        {listTD.map((item, index) => (
                          <AutocompleteItem
                            key={index}
                            value={item}
                            color="primary"
                          >
                            {item}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    ) : (
                      <Input
                        {...field}
                        color="primary"
                        size="sm"
                        type="text"
                        label="Tipo"
                        labelPlacement="outside"
                        error={errors.type_document}
                        readOnly={!isEdit}
                      />
                    )
                  }
                />
              </div>
              <div className="col-span-5">
                <Controller
                  name="document_number"
                  control={control}
                  defaultValue={data.document_number}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="Número documento"
                      labelPlacement="outside"
                      error={errors.document_number}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12 pt-2">
              <div className="col-span-6 px-1">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={data.email}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="Correo electrónico"
                      labelPlacement="outside"
                      error={errors.email}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-span-6 px-1">
                <Controller
                  name="address"
                  control={control}
                  defaultValue={data.address}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="Dirección"
                      labelPlacement="outside"
                      error={errors.address}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12 pt-2">
              <div className="col-span-6 px-1">
                <Controller
                  name="city"
                  control={control}
                  defaultValue={data.city}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="Ciudad"
                      labelPlacement="outside"
                      error={errors.city}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-span-6 px-1">
                <Controller
                  name="country"
                  control={control}
                  defaultValue={data.country}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="País"
                      labelPlacement="outside"
                      error={errors.country}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12 pt-2">
              <div className="col-span-4 px-1">
                <Controller
                  name="regimen"
                  control={control}
                  defaultValue={data.regimen}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="regimen"
                      labelPlacement="outside"
                      error={errors.regimen}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-span-4 px-1">
                <Controller
                  name="eps"
                  control={control}
                  defaultValue={data.eps}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="Gestor de salud"
                      labelPlacement="outside"
                      error={errors.eps}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-span-4 px-1">
                <Controller
                  name="status"
                  control={control}
                  defaultValue={data.status}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="Status"
                      labelPlacement="outside"
                      error={errors.status}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12 mt-3">
              <div className="col-span-6">
                <Controller
                  name="birth_date"
                  control={control}
                  defaultValue={data.birth_date}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      label="Fecha de nacimiento"
                      labelPlacement="outside"
                      error={errors.birth_date}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-span-6 pl-4 flex items-center">
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
              <div className="col-span-12 px-1">
                <Controller
                  name="names_responsible"
                  control={control}
                  defaultValue={data.names_responsible}
                  render={({ field }) => (
                    <Input
                      {...field}
                      color="primary"
                      size="sm"
                      type="text"
                      placeholder="Nombres acudiente"
                      label="Nombres acudiente"
                      labelPlacement="outside"
                      error={errors.names_responsible}
                      readOnly={!isEdit}
                    />
                  )}
                />
              </div>
              <div className="col-span-12 grid grid-cols-12">
                <div className="col-span-6 px-1">
                  <Controller
                    name="phone_responsible"
                    control={control}
                    defaultValue={data.phone_responsible}
                    render={({ field }) => (
                      <Input
                        {...field}
                        color="primary"
                        size="sm"
                        type="text"
                        label="Teléfono acudiente"
                        labelPlacement="outside"
                        error={errors.phone_responsible}
                        readOnly={!isEdit}
                      />
                    )}
                  />
                </div>
                <div className="col-span-6 px-1">
                  <Controller
                    name="email_responsible"
                    control={control}
                    defaultValue={data.email_responsible}
                    render={({ field }) => (
                      <Input
                        {...field}
                        color="primary"
                        size="sm"
                        type="text"
                        label="Email acudiente"
                        labelPlacement="outside"
                        error={errors.email_responsible}
                        readOnly={!isEdit}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </Tab>
        ) : null}
        {data.annotations > 0 ? (
          <Tab key="annotations" title={data.annotations === 1 ? `${data.annotations} Anotación` : `${data.annotations} Anotaciones`} className="col-span-12">
            <div className="col-span-12 grid grid-cols-12 px-1 w-full h-80 content-start"></div>
          </Tab>
        ) : null}
      </Tabs>
      <div className="col-span-12 flex flex-wrap justify-end item pt-2">
        <Button color="danger" variant="light" onPress={onClose}>
          {isEdit ? "Cancelar" : "Cerrar"}
        </Button>
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
        <Button color="primary" onPress={allowEdit}>
          Editar
        </Button>
      </div>
    </form>
  );
};

export default ConsultantForm;
