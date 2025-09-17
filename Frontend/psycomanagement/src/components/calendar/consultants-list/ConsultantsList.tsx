import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import EventForm from "../EventForm";
import ConsultantSection from "./ConsultantSection";
import { TherapistAuth } from "../../../context/AuthContext";
import { API_BASE_URL } from "../../../config/elementals";
import { Consultant } from "../../../types/models";

const ConsultantListCard = (): JSX.Element => {
  const { getId, getToken } = TherapistAuth();
  const [data, setData] = useState<Consultant[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const id = getId();
        const token = getToken();
        if (!id || !token) {
          return;
        }

        const response = await fetch(`${API_BASE_URL}consultants/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal,
        });

        if (!response.ok) {
          throw new Error(`Error fetching consultants: ${response.statusText}`);
        }

        const person: { consultants: Consultant[] } = await response.json();
        setData(person.consultants ?? []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error(error);
        }
      }
    };

    void fetchData();

    return () => {
      controller.abort();
    };
  }, [getId, getToken]);

  return (
    <div className="col-span-2 mt-32 ml-8">
      <Card className="max-w-[340px] max-h-[450px] border bg-slate-50" radius="sm" shadow="none">
        <CardHeader className="justify-between">
          <h1 className="font-bold">Consultantes del día: </h1>
        </CardHeader>
        <Divider />
        <ScrollShadow className="h-[336px]">
          <CardBody className="px-3 py-0 text-small text-default-400 my-2">
            {data.map((consultant) => (
              <ConsultantSection key={consultant.id_consultant} consultant={consultant} />
            ))}
          </CardBody>
        </ScrollShadow>
        <Divider />
        <CardFooter className="gap-3 justify-center">
          <EventForm />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConsultantListCard;