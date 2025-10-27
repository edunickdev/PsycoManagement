import React from 'react';
import { Input } from "@nextui-org/react";
import { Controller, Control, FieldError } from "react-hook-form";

interface SectionFormProps {
  isNew: boolean;
  name: string[];
  control: Control<any>;
  defaultValue: string[];
  label: string[];
  error: (FieldError | undefined)[];
  isEdit: boolean;
  amountElements: number;
  colSpan: number;
  withWrap?: boolean;
  rules: any[];
}

const SectionForm: React.FC<SectionFormProps> = ({
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
  rules
}) => {
  const cols = !withWrap ? colSpan : 12 / amountElements;

  const elements = [];

  for (let i = 0; i < amountElements; i++) {
    elements.push(
      <div className={`col-span-${cols}`} key={i}>
        <Controller
          rules={rules[i]}
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
              errorMessage={error[i] ? error[i]?.message : ""}
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
