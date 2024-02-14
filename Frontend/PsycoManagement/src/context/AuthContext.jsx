/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import bcrypt from "bcryptjs";
import { API_BASE_URL } from "../config/elementals";

export const AuthTherapist = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const postSignUp = async ({ data }) => {
    const urlApi = `${API_BASE_URL}auth/sign-up`;
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
    const res = await fetch(urlApi, requestOptions);
    const resData = await res.json();
    return resData;
  };

  const postSignIn = async ({ data }) => {
    const urlApi = `${API_BASE_URL}auth/login`;
    const requestData = {
      email: data.Email,
      password: data.Password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    };
    const res = await fetch(urlApi, requestOptions);
    const resData = await res.json();
    setUser(resData);
    storeToken(resData);
    return resData;
  };

  const storeToken = (data) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("id", data.id);
  };

  const getToken = () => {
    const token = sessionStorage.getItem("token");
    return token;
  };

  const getId = () => {
    const token = sessionStorage.getItem("id");
    return token;
  };

  const logOff = () => {
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthTherapist.Provider
      value={{
        user,
        postSignIn,
        postSignUp,
        getToken,
        getId,
        logOff,
      }}
    >
      {children}
    </AuthTherapist.Provider>
  );
};

export const TherapistAuth = () => {
  return useContext(AuthTherapist);
};
