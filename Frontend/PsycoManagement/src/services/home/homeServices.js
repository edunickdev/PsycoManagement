import { API_BASE_URL } from "../../config/elementals";

export const getData = () => {
  fetch(`${API_BASE_URL}home/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    });
};
