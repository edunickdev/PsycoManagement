/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";


const LoginFB = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de inicio de sesión, por ejemplo, enviar los datos al servidor.
    console.log("Form submitted:", formData);
  };

  return (
    <div className="relative">
      <button
        onClick={openPopup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open Login
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
            <form
              className="bg-white p-8 rounded shadow-md max-w-md w-full"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />

              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-6"
                required
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Login
              </button>
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              >
                {/* Icono de cierre */}Cerrar
              </button>
              {/* Contenido del formulario */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginFB;
