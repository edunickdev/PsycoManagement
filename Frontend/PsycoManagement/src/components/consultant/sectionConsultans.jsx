/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import ConsultantItem from "./consultantItem";
import { AuthTherapist } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/elementals";

const SectionConsultant = ({ inputValue }) => {
  const TherapistAuth = useContext(AuthTherapist);

  const id = TherapistAuth.getId();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const getData = () => {
    fetch(`${API_BASE_URL}consultants/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((person) => {
        setData(person["consultants"]);
      });
  };

  const filterConsultants = (inputValue) => {
    const lowerInputValue = inputValue.toLowerCase();
    const filteredData = data.filter((consultant) =>
      (consultant.names && consultant.names.toLowerCase().includes(lowerInputValue)) ||
      (consultant.last_names && consultant.last_names.toLowerCase().includes(lowerInputValue))
    );
    setFilterData(filteredData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (inputValue) {
      filterConsultants(inputValue);
    } else {
      setFilterData([]);
    }
  }, [inputValue, data]);

  return (
    <div className="col-span-12 row-span-1 py-5 mt-10 mx-10">
      <div className="flex flex-wrap gap-3">
        {data.length === 0 && (
          <h1 className="text-2xl font-semibold text-center col-span-12">
            No tiene consultantes registrados
          </h1>
        )}
        {inputValue === ""
          ? data.map((consultant) => {
              return (
                <ConsultantItem
                  key={consultant.id_consultant}
                  consultant={consultant}
                />
              );
            })
          : filterData.map((consultant) => (
              <ConsultantItem
                key={consultant.id_consultant}
                consultant={consultant}
              />
            ))}
      </div>
    </div>
  );
};

export default SectionConsultant;
