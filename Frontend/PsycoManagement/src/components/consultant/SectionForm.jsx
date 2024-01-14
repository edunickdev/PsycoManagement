/* eslint-disable react/prop-types */
import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";

const SectionForm = ({
  isNew,
  name,
  control,
  defaultValue,
  label,
  error,
  isEdit,
  amountElements,
  colSpan,
  withWrap = true,
}) => {
  const cols = ( !withWrap ) ? colSpan : 12 / amountElements;

  const elements = [];

  for (let i = 0; i < amountElements; i++) {
    elements.push(
      <div className={`col-span-${cols}`} key={i}>
        <Controller
          name={name[i]}
          control={control}
          defaultValue={isNew ? "" : defaultValue[i]}
          render={({ field }) => (
            <Input
              {...field}
              color="primary"
              size="sm"
              label={label[i]}
              labelPlacement="outside"
              error={error[i]}
              readOnly={!isEdit}
              className={!withWrap ? "" : `col-span-${colSpan}`}
            />
          )}
        />
      </div>
    );
  }

  return withWrap ? (
    <div className="col-span-12 grid grid-cols-12 pt-2 gap-1">{elements}</div>
  ) : (
    <>{elements}</>
  );
};

export default SectionForm;
