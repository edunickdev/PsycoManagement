export const get_consultants = ({ data }) => {
  try {
    if (data.annotations > 0) {
      const my_consultants = fetch(
        `http://localhost:3000/api/annotations/${data.id_consultant}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json());

      return my_consultants;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
