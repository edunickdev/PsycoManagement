/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ConsultantItem from "./consultantItem";


const SectionConsultant = ({ consultants }) => {

  return (
    <div className="col-span-12 row-span-1 py-5 mt-10 mx-10">
      <div className="flex flex-wrap gap-3">
        {consultants.map((consultant) => { 
          {/* return ( */}
            <ConsultantItem />
          {/* ); */}
         })}
      </div>
    </div>
  );
};

export default SectionConsultant;
