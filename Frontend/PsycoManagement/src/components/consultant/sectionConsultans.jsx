/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import ConsultantItem from "./consultantItem";
import { AuthTherapist } from "../../context/AuthContext";


const SectionConsultant = () => {

  const TherapistAuth = useContext(AuthTherapist);
  
  const [data, setData] = useState([]);

  useEffect (() => {
    const getData = () => {
      fetch("http://127.0.0.1:8000/consultants?id_therapist=658da3e92d4804b8445e80eb")
        .then((response) => response.json())
        .then((data) => {
          setData(data["consultants"]);
        });
      };
    getData();
  }, []);

  return (
    <div className="col-span-12 row-span-1 py-5 mt-10 mx-10">
      <div className="flex flex-wrap gap-3">
        {data.map((consultant, index) => { 
          return (
            <ConsultantItem key={index} consultant={consultant} />
          ); 
         })}
      </div>
    </div>
  );
};

export default SectionConsultant;
