import { API_BASE_URL } from "../../config/elementals";

export const getConsultants = (id) => {

  return fetch(`${API_BASE_URL}consultants/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((person) => {
      return person;
    });
};
