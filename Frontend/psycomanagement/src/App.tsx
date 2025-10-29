import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from "./context/AuthContext";
import { AppRouter } from "./routers/routes";

const App = (): JSX.Element => {
  return (
    <NextUIProvider>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </NextUIProvider>
  );
};

export default App;
