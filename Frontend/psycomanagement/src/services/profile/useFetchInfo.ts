import { useEffect, useState } from "react";
import { useInfoProfile } from "../../context/stores";
import { API_BASE_URL } from "../../config/elementals";
import { ProfileInfo } from "../../types/models";

interface UseFetchInfoResult {
  myInfo: ProfileInfo | null;
  loading: boolean;
}

const useFetchInfo = (): UseFetchInfoResult => {
  const setCurrentInfo = useInfoProfile((state) => state.setInfoProfile);
  const myInfo = useInfoProfile((state) => state.infoProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getInfo = async () => {
      try {
        const id = sessionStorage.getItem("id");
        if (!id) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}profile/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          signal,
        });
        const data: ProfileInfo = await response.json();
        setCurrentInfo(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error fetching profile info:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    void getInfo();

    return () => {
      controller.abort();
    };
  }, [setCurrentInfo]);

  return { myInfo, loading };
};

export default useFetchInfo;
