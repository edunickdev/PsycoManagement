import { useEffect, useState } from "react";
import { useAuthStore } from "../../context/stores";
import { API_BASE_URL } from "../../config/elementals";

interface UseFetchInfoResult {
  myInfo: Record<string, unknown>;
  loading: boolean;
}

const useFetchInfo = (): UseFetchInfoResult => {
  const setCurrentInfo = useAuthStore((state) => state.setInfoProfile);
  const myInfo = useAuthStore((state) => state.infoProfile);
  const [loading, setLoading] = useState<boolean>(true);

  const requestInfo = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getInfo = async (): Promise<void> => {
    const response = await fetch(
      `${API_BASE_URL}profile/${sessionStorage.getItem("id")}`,
      requestInfo
    );
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
