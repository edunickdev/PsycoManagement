import { useEffect, useState } from "react";
import Cards from "./cards";
import { API_BASE_URL } from "../../config/elementals";

const SectionCards = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(`${API_BASE_URL}home/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="relative flex justify-center">
        {data.map((item) => (
          <Cards key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SectionCards;
