import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from "bcryptjs";

const ContentSignUp = () => {
  const notify = ({ text, type }) => {
    toast[type](text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  };

  const[mode, setMode] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const postSignUp = async ({ data }) => {
    const urlApi = "http://127.0.0.1:8000/auth/sign-up"
    const hashedPassword = await bcrypt.hash(data.Password, 10);
    const requestData = {
      names: data.Nombre + " " + data.Apellido,
      email: data.Email,
      password: hashedPassword,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    };
    const res = await fetch(urlApi, requestOptions)
    return res;
  };

  const onSubmit = async (data) => {
    const response = await postSignUp({ data });
    const responseObject = await response.json();

    if (responseObject.registered === 'usuario creado') {
      notify({ text: responseObject.message, type: "success" })
      setMode(!mode);
      reset();
    } else {
      notify({ text: responseObject.message, type: "error" })
    }
  };

  const fields = [
    {
      name: "Nombre",
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
      name: "Apellido",
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
      validations: {
        required: "Este campo es requerido",
        minLength: {
          value: 8,
          message: "La contraseña debe contener almenos 8 caractéres",
        },
      },
    },
  ];

  return (
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative flex justify-center">
          <div className="flex flex-col justify-center items-center bg-slate-200 h-auto py-6 px-10 rounded-xl -mb-16 transition-height duration-300">
            <h2 className="text-3xl mb-3">{mode === false ? "Regístrate ahora" : "Inicio de sesión"}</h2>
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
                        className={`py-[2px] w-60 ${mode === true && input.name === "Nombre" || mode === true && input.name == "Apellido" ? "hidden" : ""}`}
                        size="sm"
                        errorMessage={errors[input.name]?.message}
                      />
                    )}
                  />
                );
              })}
              <span className="text-tiny self-end px-2">
                {mode === false ? "¿Ya estas registrado?" : "¿No tienes una cuenta?"}
                <a href="#" className="underline text-blue-700 font-semibold px-1" onClick={()=> setMode(!mode)}>
                  {mode === false ? "Inicia Sesión" : "Regístrate"}
                </a>
              </span>
              <Button
                type="submit"
                variant="solid"
                className="mt-3 font-semibold"
                color="success"
              >
                {mode === false ? "Registrarse" : "Iniciar Sesión"}
              </Button>
              <ToastContainer className={"mt-12"} />
            </form>
          </div>
        </div>
      </div>
  );
};

export default ContentSignUp;
