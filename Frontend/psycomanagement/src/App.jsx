import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { AppRouter } from "./routers/routes";

function App() {
  return (
    <NextUIProvider>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </NextUIProvider>
  );
}

export default App;
