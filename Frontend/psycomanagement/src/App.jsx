/* eslint-disable no-unused-vars */
import './App.css'
import { useState } from "react";

// importando modulos de firebase
import appFirebase from "../src/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFirebase);

// importando nuestros componentes
import LoginFB from "./components/LoginFB";
import Home from "../src/components/Home";

function App() {

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
    else {
      setUser(null);
    }
  });

  return (
    <div className='container'>
      {user ? <Home correo={user.email} /> : <LoginFB />}
    </div>
  )
}

export default App
