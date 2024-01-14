/* eslint-disable react/prop-types */
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";

const AutocompleteForm = ({ name, defaultValue, defaultInputValue }) => {
  const listTD = ["CC", "TI", "CE", "PA", "RC", "NIT", "RUT", "DNI"];
  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <Controller
      name={name}
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
          error={errors[name]}
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
