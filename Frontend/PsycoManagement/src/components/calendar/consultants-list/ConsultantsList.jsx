import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, ScrollShadow } from "@nextui-org/react";
import EventForm from "../EventForm";

const ConsultantListCard = () => {

    return (
        <div className="col-span-2 mt-32 ml-8">
            <Card className="max-w-[340px] max-h-[450px] border bg-slate-50" radius="sm" shadow="none">
                <CardHeader className="justify-between">
                    <h1 className="font-bold">Consultantes del día: </h1>
                </CardHeader>
                <Divider />
                <ScrollShadow className="h-[336px]">
                    <CardBody className="px-3 py-0 text-small text-default-400 my-2">
                        <p>
                            Listado de todos los consultants aqui <br />
                            1. Lopez <br />
                            2. Agudelo <br />
                            3. Barrero
                        </p>
                        <p>
                            Listado de todos los consultants aqui <br />
                            1. Lopez <br />
                            2. Agudelo <br />
                            3. Barrero
                        </p>
                    </CardBody>
                </ScrollShadow>
                <Divider />
                <CardFooter className="gap-3 justify-center">
                    <EventForm />
                </CardFooter>
            </Card>
        </div>
    )
}

export default ConsultantListCard;