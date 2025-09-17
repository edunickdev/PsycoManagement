import { Button, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { TherapistAuth } from "../../context/AuthContext";

interface AuthFormFields {
  Nombre: string;
  Apellido: string;
  Email: string;
  Password: string;
}

type ToastType = "success" | "error" | "warn" | "info" | "default";

const ContentSignUp = (): JSX.Element => {
  const { postSignUp, postSignIn, mode, setModeAuth } = TherapistAuth();

  const route = useNavigate();

  const getToastByType = (type: ToastType) => {
    switch (type) {
      case "success":
        return toast.success;
      case "error":
        return toast.error;
      case "warn":
        return toast.warn;
      case "info":
        return toast.info;
      default:
        return toast;
    }
  };

  const notify = ({ text, type }: { text: string; type: ToastType }) => {
    const toastFn = getToastByType(type);
    toastFn(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormFields>({ defaultValues: { Nombre: "", Apellido: "", Email: "", Password: "" } });

  const onSubmit = async (data: AuthFormFields) => {
    const decisionObject = async () => {
      if (mode) {
        const response = await postSignIn({ data });
        route("/home");
        return response;
      }
      return postSignUp({ data });
    };

    const responseObject = await decisionObject();

    if (!responseObject || !responseObject.status) {
      notify({ text: "Ocurrió un error inesperado", type: "error" });
      return;
    }

    switch (responseObject.status) {
      case "usuario ya existe":
        notify({ text: String(responseObject.message ?? "Usuario ya existe"), type: "warn" });
        reset();
        break;
      case "usuario creado":
        notify({ text: String(responseObject.message ?? "Usuario creado"), type: "success" });
        setModeAuth(!mode);
        reset();
        break;
      case "información incorrecta":
        notify({ text: String(responseObject.message ?? "Información incorrecta"), type: "error" });
        reset();
        break;
      case "inicio exitoso":
        notify({ text: String(responseObject.message ?? "Inicio exitoso"), type: "success" });
        reset();
        break;
      default:
        notify({ text: String(responseObject.message ?? "Respuesta inesperada"), type: "info" });
        break;
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
          <h2 className="text-3xl mb-3">
            {mode === false ? "Regístrate ahora" : "Inicio de sesión"}
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
          >
            {mode
              ? fields.slice(2, 4).map((input) => {
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
                          className={`py-[2px] w-60`}
                          size="sm"
                          errorMessage={errors[input.name]?.message}
                        />
                      )}
                    />
                  );
                })
              : fields.slice(0, 4).map((input) => {
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
                          className={`py-[2px] w-60`}
                          size="sm"
                          errorMessage={errors[input.name]?.message}
                        />
                      )}
                    />
                  );
                })}
            <span className="text-tiny self-end px-2">
              {mode === false
                ? "¿Ya estas registrado?"
                : "¿No tienes una cuenta?"}
              <a
                href="#"
                className="underline text-blue-700 font-semibold px-1"
                onClick={() => setModeAuth(!mode)}
              >
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
