import { Button, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";

const ContentSignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    JSON.stringify(data);
    reset();
  };

  const fields = [
    {
      name: "Nombre(s)",
      type: "text",
      validations: {
        required: "Este campo es requerido",
        maxLength: {
          value: 20,
          message: "Este campo recibe máximo 20 caractéres",
        },
        minLength: {
          value: 8,
          message: "Este campo recibe mínimo 8 caractéres",
        },
      },
    },
    {
      name: "Apellido(s)",
      type: "text",
      validations: {
        required: "Este campo es requerido",
        maxLength: {
          value: 20,
          message: "Este campo recibe máximo 20 caractéres",
        },
        minLength: {
          value: 8,
          message: "Este campo recibe mínimo 8 caractéres",
        },
      },
    },
    {
      name: "Email",
      type: "email",
      validations: {
        required: "Este campo es requerido",
        pattern: { value: /\S+@\S+\.\S+/, message: "El email no es válido" },
      },
    },
    {
      name: "Password",
      type: "password",
      validations: { required: "Este campo es requerido", minLength: {value: 8, } },
    },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="relative flex justify-center">
        <div className="flex flex-col justify-center items-center bg-slate-200 h-auto py-6 px-10 rounded-xl -mb-16">
          <h2 className="text-3xl mb-3">Regístrate ahora</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
          >
            {fields.map((input) => {
              return (
                <Controller
                  type={input.type}
                  key={input.name}
                  rules={input.validations}
                  name={input.name}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      type={input.type}
                      labelPlacement="inside"
                      label={field.name}
                      {...field}
                      className="py-[2px] w-60"
                      size="sm"
                      errorMessage={errors[input.name]?.message}
                    />
                  )}
                />
              );
            })}
            <span className="text-tiny self-end px-2">
              ¿Ya estas registrado?{" "}
              <a href="#" className="underline text-blue-700">
                Inicia Sesión
              </a>
            </span>
            <Button
              type="submit"
              variant="solid"
              className="mt-3"
              color="success"
            >
              Registrarse
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentSignUp;
