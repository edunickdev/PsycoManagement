/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import bcrypt from "bcryptjs";

export const AuthTherapist = createContext();

export const AuthContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

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
        setUser(res);
        return res;
      };

      const postSignIn = async ({ data }) => {
        const urlApi = "http://127.0.0.1:8000/auth/login"
        const requestData = {
          email: data.Email,
          password: data.Password,
        };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        };
        const res = await fetch(urlApi, requestOptions)
        setUser(res);
        return res;
      };

      const storeToken = ({ token }) => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            null
        }
      }

      const getToken = () => {
        const token = localStorage.getItem("token");
        return token;
      }

      const logOff = () => {
        localStorage.removeItem("token");
        setUser(null);
      }


    return <AuthTherapist.Provider value={{ user, postSignIn, postSignUp, storeToken, getToken, logOff }}>{children}</AuthTherapist.Provider>
}

export const TherapistAuth = () => {
    return useContext(AuthTherapist);
}

