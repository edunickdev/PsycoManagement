/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, CardFooter, Avatar, AvatarIcon } from "@nextui-org/react";

const ConsultantSection = ({ consultant }) => {

    const initials = consultant.names.split("")[0] + consultant.last_names.split("")[0];
    const age = new Date().getFullYear() - consultant.birth_date.split("/")[2];

    return (
        <>
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
                            <h4 className="text-small font-semibold leading-none text-default-600">{consultant.names} {consultant.last_names}</h4>
                            <h5 className="text-small tracking-tight text-default-400">Tel: {consultant.phone}</h5>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                </CardBody>
            </Card>
        </>
    );
};

export default ConsultantSection;
