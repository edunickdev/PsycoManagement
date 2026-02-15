import React, { useEffect, useState } from "react";
import FeatureCard from "../molecules/FeatureCard";
import { getData } from "../../services/home/homeServices";

const FeatureSection = () => {
  const [data, setData] = useState([]);

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
    <div className="w-full max-w-7xl mx-auto px-6 py-20 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {data.map((item) => (
          <FeatureCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
