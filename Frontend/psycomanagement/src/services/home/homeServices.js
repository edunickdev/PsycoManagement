import { API_BASE_URL } from "../../config/elementals";

export const getData = () => {
  return fetch(`${API_BASE_URL}home/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};
