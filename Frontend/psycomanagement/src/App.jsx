import { AuthContextProvider } from "./context/AuthContext";
import { AppRouter } from "./routers/routes";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
