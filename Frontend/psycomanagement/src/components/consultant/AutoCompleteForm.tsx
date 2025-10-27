import React from 'react';
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";

interface AutocompleteFormProps {
    name: string;
    defaultValue: string;
    defaultInputValue: string;
}

const AutocompleteForm: React.FC<AutocompleteFormProps> = ({ name, defaultValue, defaultInputValue }) => {
  const listTD = ["CC", "TI", "CE", "PA", "RC", "NIT", "RUT", "DNI"];
  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <Controller
      name={name}
      rules={{
        required: "Este campo es obligatorio",
        minLength: {
          value: 2,
          message: "Este campo no puede tener menos de 2 caracteres",
        },
        maxLength: {
          value: 2,
          message: "Este campo no puede tener más de 2 caracteres",
        },
      }}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Autocomplete
          className="col-span-4"
          {...field}
          size="sm"
          label="Tipo"
          color="primary"
          labelPlacement="outside"
          defaultInputValue={defaultInputValue}
          isInvalid={!!errors[name]}
          errorMessage={errors[name]?.message as string}
        >
          {listTD.map((item, index) => (
            <AutocompleteItem key={index} value={item} color="primary">
              {item}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}
    />
  );
};

export default AutocompleteForm;
