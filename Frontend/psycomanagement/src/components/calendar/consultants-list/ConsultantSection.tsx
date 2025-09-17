import { Card, CardHeader, CardBody, Avatar, AvatarIcon } from "@nextui-org/react";
import { Consultant } from "../../../types/models";

interface ConsultantSectionProps {
  consultant: Consultant;
}

const ConsultantSection = ({ consultant }: ConsultantSectionProps): JSX.Element => {
  const [firstName = ""] = consultant.names.split(" ");
  const [lastName = ""] = consultant.last_names.split(" ");
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <Card className="m-1" radius="sm" shadow="none">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            icon={<AvatarIcon />}
            classNames={{
              base: "bg-gradient-to-br from-[#D4D4D8] to-[#A1A1AA]",
              icon: "text-white/90",
            }}
            size="sm"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {consultant.names} {consultant.last_names}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">Tel: {consultant.phone}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <span className="text-xs text-default-500">{initials}</span>
      </CardBody>
    </Card>
  );
};

export default ConsultantSection;
