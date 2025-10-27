import { NextUIProvider } from "@nextui-org/react";
import { AppRouter } from "./routers/routes";

function App() {
  return (
    <NextUIProvider>
      <AppRouter />
    </NextUIProvider>
  );
}

export default App;
