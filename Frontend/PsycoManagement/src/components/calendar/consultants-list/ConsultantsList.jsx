import { React, useContext, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, ScrollShadow } from "@nextui-org/react";
import EventForm from "../EventForm";
import { AuthTherapist } from "../../../context/AuthContext";
import ConsultantSection from "./ConsultantSection";

//import ConsultantSection from "./ConsultantSection";

const ConsultantListCard = () => {
    const TherapistAuth = useContext(AuthTherapist);

    const id = TherapistAuth.getId();
    const [data, setData] = useState([]);
    //const [filterData, setFilterData] = useState([]);

    const getData = () => {
        fetch(`http://127.0.0.1:8000/consultants/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((person) => {
                setData(person["consultants"]);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="col-span-2 mt-32 ml-8">
            <Card className="max-w-[340px] max-h-[450px] border bg-slate-50" radius="sm" shadow="none">
                <CardHeader className="justify-between">
                    <h1 className="font-bold">Consultantes del día: </h1>
                </CardHeader>
                <Divider />
                <ScrollShadow className="h-[336px]">
                    <CardBody className="px-3 py-0 text-small text-default-400 my-2">
                        {data.map((consultant) => 
                            <ConsultantSection 
                                key={consultant.id_consultant}
                                consultant={consultant}
                            />
                        )}
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