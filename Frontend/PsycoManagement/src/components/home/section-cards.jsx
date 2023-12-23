import { useEffect, useState } from "react";
import Cards from "./cards";

const SectionCards = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const { title, description } = data;

  useEffect(() => {
    const getData = () => {
      fetch("http://127.0.0.1:8000/home/")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data);
        });
    };
    getData();
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="relative flex justify-center">
        {data.map((item) => (
          <Cards
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionCards;
