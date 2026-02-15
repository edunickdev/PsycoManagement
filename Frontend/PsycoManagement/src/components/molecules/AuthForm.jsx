import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { TherapistAuth } from "../../context/AuthContext";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import GlassCard from "../atoms/GlassCard";

const AuthForm = () => {
  const { postSignUp, postSignIn, mode, setModeAuth } = TherapistAuth();
  const navigate = useNavigate();

  const notify = ({ text, type }) => {
    toast[type](text, {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      let responseObject;
      if (mode) {
        responseObject = await postSignIn({ data });
        if (responseObject.status === "inicio exitoso") {
          notify({ text: responseObject.message, type: "success" });
          setTimeout(() => navigate("/home"), 1000);
        }
      } else {
        responseObject = await postSignUp({ data });
        if (responseObject.status === "usuario creado") {
          notify({ text: responseObject.message, type: "success" });
          setModeAuth(true);
          reset();
        }
      }

      if (responseObject.status === "usuario ya existe" || responseObject.status === "información incorrecta") {
        notify({ text: responseObject.message, type: "error" });
      }
    } catch (error) {
      notify({ text: "Error en el servidor", type: "error" });
    }
  };

  const fields = [
    { name: "Nombre", type: "text", rules: { required: "Requerido" } },
    { name: "Apellido", type: "text", rules: { required: "Requerido" } },
    { name: "Email", type: "email", rules: { required: "Requerido", pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" } } },
    { name: "Password", type: "password", rules: { required: "Requerido", minLength: { value: 8, message: "Mínimo 8 caracteres" } } },
  ];

  const activeFields = mode ? fields.slice(2, 4) : fields;

  return (
    <GlassCard intensity="high" className="w-full max-w-md p-8 border-white/10 shadow-2xl">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          {mode ? "Bienvenido" : "Crea tu cuenta"}
        </h2>
        <p className="text-gray-400 text-sm">
          {mode ? "Ingresa tus credenciales para continuar" : "Únete a la plataforma para psicólogos"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-4">
          {activeFields.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              defaultValue=""
              rules={field.rules}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={field.name}
                  type={field.type}
                  value={value}
                  onChange={onChange}
                  error={errors[field.name]?.message}
                  placeholder={`Ingresa tu ${field.name.toLowerCase()}`}
                />
              )}
            />
          ))}
        </div>

        <div className="flex flex-col space-y-4 pt-2">
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-3"
            isLoading={isSubmitting}
          >
            {mode ? "Iniciar Sesión" : "Registrarse"}
          </Button>

          <p className="text-center text-sm text-gray-400">
            {mode ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
            <button
              type="button"
              className="text-primary font-bold hover:underline"
              onClick={() => {
                setModeAuth(!mode);
                reset();
              }}
            >
              {mode ? "Regístrate" : "Inicia Sesión"}
            </button>
          </p>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </GlassCard>
  );
};

export default AuthForm;
