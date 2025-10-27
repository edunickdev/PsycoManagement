import React, { useEffect, useState } from "react";
import Cards from "./cards";
import { getData } from "../../services/home/homeServices";

interface CardData {
  id: number;
  subtitle: string;
  image: string;
  description: string;
  title: string;
}

const SectionCards: React.FC = () => {
  const [data, setData] = useState<CardData[]>([]);

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
