import { useEffect, useState } from "react";
import { useInfoProfile } from "../../context/stores";
import { API_BASE_URL } from "../../config/elementals";

const useFetchInfo = () => {
  const setCurrentInfo = useInfoProfile((state) => state.setInfoProfile);
  const myInfo = useInfoProfile((state) => state.infoProfile);
  const [loading, setLoading] = useState(true);

  const requestInfo = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getInfo = async () => {
    const response = await fetch(`${API_BASE_URL}profile/${sessionStorage.getItem("id")}`, requestInfo);
    const data = await response.json();
    setCurrentInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return { myInfo, loading };
};

export default useFetchInfo;
