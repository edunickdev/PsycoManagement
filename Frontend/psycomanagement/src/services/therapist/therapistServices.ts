import { API_BASE_URL } from "../../config/elementals";
import { Consultant } from "../../types/models";

interface ConsultantResponse {
  consultants: Consultant[];
}

export const getConsultants = async (id: string, signal?: AbortSignal): Promise<ConsultantResponse> => {
  const response = await fetch(`${API_BASE_URL}consultants/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Error fetching consultants: ${response.statusText}`);
  }

  const data: ConsultantResponse = await response.json();
  return data;
};
