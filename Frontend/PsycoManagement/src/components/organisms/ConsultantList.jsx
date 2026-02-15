import React, { useEffect, useState } from "react";
import ConsultantCard from "../molecules/ConsultantCard";
import { TherapistAuth } from "../../context/AuthContext";
import { getConsultants } from "../../services/therapist/therapistServices";

const ConsultantList = ({ inputValue }) => {
  const { getId } = TherapistAuth();
  const id = getId();

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getConsultants(id);
        setData(resp["consultants"] || []);
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    if (inputValue) {
      const lowerInputValue = inputValue.toLowerCase();
      const filtered = data.filter((consultant) =>
        (consultant.names && consultant.names.toLowerCase().includes(lowerInputValue)) ||
        (consultant.last_names && consultant.last_names.toLowerCase().includes(lowerInputValue))
      );
      setFilterData(filtered);
    } else {
      setFilterData(data);
    }
  }, [inputValue, data]);

  return (
    <div className="w-full py-10">
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
          <svg className="w-20 h-20 mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h2 className="text-xl font-medium text-gray-400">
            No tienes consultantes registrados
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {filterData.map((consultant) => (
            <ConsultantCard
              key={consultant.id_consultant}
              consultant={consultant}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsultantList;
