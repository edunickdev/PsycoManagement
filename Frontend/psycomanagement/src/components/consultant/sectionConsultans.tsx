import { useEffect, useMemo, useState } from "react";
import ConsultantItem from "./consultantItem";
import { TherapistAuth } from "../../context/AuthContext";
import { getConsultants } from "../../services/therapist/therapistServices";
import { Consultant } from "../../types/models";

interface SectionConsultantProps {
  inputValue: string;
}

const SectionConsultant = ({ inputValue }: SectionConsultantProps): JSX.Element => {
  const { getId } = TherapistAuth();
  const [data, setData] = useState<Consultant[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const id = getId();
        if (!id) {
          return;
        }
        const resp = await getConsultants(id, signal);
        setData(resp.consultants ?? []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error fetching consultants:", error);
        }
      }
    };

    void fetchData();

    return () => {
      controller.abort();
    };
  }, [getId]);

  const filteredData = useMemo(() => {
    if (!inputValue) {
      return [] as Consultant[];
    }

    const lowerInputValue = inputValue.toLowerCase();
    return data.filter((consultant) =>
      (consultant.names && consultant.names.toLowerCase().includes(lowerInputValue)) ||
      (consultant.last_names && consultant.last_names.toLowerCase().includes(lowerInputValue))
    );
  }, [data, inputValue]);

  const consultantsToRender = inputValue ? filteredData : data;

  return (
    <div className="col-span-12 row-span-1 py-5 mt-10 mx-10">
      <div className="flex flex-wrap gap-3">
        {consultantsToRender.length === 0 && (
          <h1 className="text-2xl font-semibold text-center col-span-12">
            No tiene consultantes registrados
          </h1>
        )}
        {consultantsToRender.map((consultant) => (
          <ConsultantItem key={consultant.id_consultant} consultant={consultant} />
        ))}
      </div>
    </div>
  );
};

export default SectionConsultant;
