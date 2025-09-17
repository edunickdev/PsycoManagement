import { useEffect, useState } from "react";
import Cards from "./cards";
import { getData } from "../../services/home/homeServices";
import { HomeCard } from "../../types/models";

const SectionCards = (): JSX.Element => {
  const [data, setData] = useState<HomeCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getData();
        setData(resp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
