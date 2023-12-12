import LoginForm from "../../components/login/loginForm";
import { staticFiles } from "../../config/statics";

const LoginPage = () => {
  return (
      <div>
        <img
          src={staticFiles.fondoLogin}
          alt={staticFiles.fondoLogin}
          className="h-screen w-screen object-cover absolute"
          style={{ filter: "brightness(0.3)" }}
        />
        <div className="w-full h-full flex justify-center">
          <LoginForm />
        </div>
      </div>
  );
};

export default LoginPage;
