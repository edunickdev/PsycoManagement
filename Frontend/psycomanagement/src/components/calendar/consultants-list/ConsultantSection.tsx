import React from 'react';
import { Card, CardHeader, CardBody, Avatar, AvatarIcon } from "@nextui-org/react";

interface Consultant {
    names: string;
    last_names: string;
    birth_date: string;
    phone: string;
}

interface ConsultantSectionProps {
    consultant: Consultant;
}

const ConsultantSection: React.FC<ConsultantSectionProps> = ({ consultant }) => {

    const age = new Date().getFullYear() - parseInt(consultant.birth_date.split("/")[2]);

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
