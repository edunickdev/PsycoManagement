import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import { staticFiles } from "../../config/statics";
import { useContext } from "react";
import { AuthTherapist } from "../../context/AuthContext";



const LoginForm = () => {

  const { SignUp } = useContext(AuthTherapist);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await SignUp(data.email, data.password);
      console.log(response);
      return response;
    } catch (error) {
      alert(error.message);
    }
    reset();
  };

  return (
    
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-around items-center h-auto w-96 z-20 bg-blue-500 mt-10 md:mt-20 rounded-xl p-10 border-3 border-blue-300"
    >
      <h2 className="text-5xl mb-10 text-gray-300 font-bold">Registrate</h2>
      <CustomInput
        name="email"
        label="Correo electrónico"
        type="text"
        validations={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
        }}
        register={register}
        errors={errors}
      />
      <CustomInput
        name="password"
        label="Contraseña"
        type="password"
        validations={{
          required: {
            value: true,
            message: "Este campo es requerido",
          },
          minLength: {
            value: 8,
            message: "Debe tener al menos 8 caracteres",
          },
        }}
        register={register}
        errors={errors}
      />
      <button
        type="submit"
        className="bg-green-900 w-auto px-5 h-10 text-center hover:border-green-950 focus:bg-green-400 hover:text-white mt-8 rounded-lg text-gray-300 transition-colors"
      >
        Siguiente
      </button>
      <div className="w-1 h-5 bg-blue-300 mt-2 mb-1 rounded-md"></div>
      <span className="text-gray-300">o inicia con</span>
      <div className="w-1 h-8 bg-blue-300 mt-2 mb-1 rounded-md"></div>
      <div className="flex m-2">
        <button
          type="button"
          className="bg-white w-11 h-11 mx-2 flex justify-center items-center rounded-xl"
        >
          <img
            src={staticFiles.iconGoogle}
            alt={staticFiles.iconGoogle}
            className="w-9 h-9 hover:w-10 hover:h-10 transition-all"
          />
        </button>
        <button
          type="button"
          className="bg-white w-11 h-11 mx-2 flex justify-center items-center rounded-xl"
        >
          <img
            src={staticFiles.iconMicrosoft}
            alt={staticFiles.iconGoogle}
            className="w-8 h-8 hover:w-9 hover:h-9 transition-all"
          />
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
