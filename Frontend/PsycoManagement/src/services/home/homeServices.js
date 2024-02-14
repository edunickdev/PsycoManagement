export const getData = () => {
  fetch("http://127.0.0.1:8000/home/", {
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
