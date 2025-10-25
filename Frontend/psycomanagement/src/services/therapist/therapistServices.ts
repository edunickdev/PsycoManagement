import { API_BASE_URL } from "../../config/elementals";

export const getConsultants = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}consultants/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const person = await response.json();
    return person;
  } catch (error) {
    console.error(error);
  }
};
