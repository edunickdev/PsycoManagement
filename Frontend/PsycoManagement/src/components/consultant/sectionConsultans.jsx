/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import ConsultantItem from "./consultantItem";
import { AuthTherapist } from "../../context/AuthContext";


const SectionConsultant = () => {

  const TherapistAuth = useContext(AuthTherapist);
  
  const id = TherapistAuth.getId();
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(`http://127.0.0.1:8000/consultants/${id}`,)
      .then((response) => response.json())
      .then((person) => {
        setData(person["consultants"]);
      });
    };

  useEffect (() => {
    getData();
  }, []);

  return (
    <div className="col-span-12 row-span-1 py-5 mt-10 mx-10">
      <div className="flex flex-wrap gap-3">
        {data.length === 0 && <h1 className="text-2xl font-semibold text-center col-span-12">No tiene consultantes registrados</h1>}
        {data.map((consultant) => {
          console.log(consultant);
          return (
            <ConsultantItem key={consultant.id_consultant} consultant={consultant} />
          );
         })}
      </div>
    </div>
  );
};

export default SectionConsultant;
