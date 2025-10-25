import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
} from "@nextui-org/react";
import { TherapistAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const UserCard = () => {
  const { user, setModeAuth, logOff } = TherapistAuth();
  const route = useNavigate();

  const shortName =  user ? user.names : "";

  return (
    <>
      {user ? (
        <Card
          shadow="none"
          className="max-w-[200px] border-none bg-transparent"
        >
          <CardHeader className="justify-between">
            <div className="flex gap-2">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
              />
              <div className="flex flex-col items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Terapeuta
                </h4>
                <h5 className="text-small tracking-tight text-default-500">
                  {shortName}
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3">
            <Button
              variant="flat"
              color="primary"
              block
              onPress={() => route("/profile")}
            >
              Ver Perfil
            </Button>
          </CardBody>
          <CardFooter className="gap-3 flex flex-col justify-center">
            <Button
              fullWidth
              variant="flat"
              color="danger"
              block
              onPress={() => {
                logOff();
                setModeAuth(true);
                route("/auth");
              }}
            >
              Cerrar Sesión
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card
          shadow="none"
          className="max-w-[200px] border-none bg-transparent"
        >
          <CardHeader className="justify-between gap-1 p-1 flex flex-col">
            <Button variant="flat" color="success" onPress={ () => {
              setModeAuth(false);
              route('/auth')
            }}>
              Registrarme
            </Button>
            <Button variant="bordered" color="primary" onPress={ () => {
              setModeAuth(true);
              route('/auth')
            } }>
              Iniciar Sesión
            </Button>
          </CardHeader>
        </Card>
      )}
    </>
  );
};
