import { API_BASE_URL } from "../../config/elementals";
import { HomeCard } from "../../types/models";

export const getData = async (): Promise<HomeCard[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}home/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching home data: ${response.statusText}`);
    }

    const data: HomeCard[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
