/* eslint-disable react/prop-types */

const CustomInput = ({ name, label, type, validations = {}, register, errors }) => {
  return (
    <div className="flex flex-col justify-start">
      <label htmlFor={name} className="my-2 font-semibold ml-2">
        {label} 
      </label>
      <input
        placeholder={`Escribe tu ${label.toLowerCase()}`}
        className="w-64 px-3 py-1 bg-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-spacing-4 hover:bg-slate-300 focus:bg-slate-50 transition-colors"
        type={type}
        {...register(name, validations)}
      />
      {errors[name] && (
        <span className="text-red-700 transition-all">{errors[name].message}</span>
      )}
    </div>
  );
};

export default CustomInput;
