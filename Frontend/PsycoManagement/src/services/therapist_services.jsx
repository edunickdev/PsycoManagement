export const get_annotations = ({ data }) => {
      fetch(
        `http://localhost:3000/annotations/${data.id_consultant}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.json())
      .then((annotations) => {
        console.log(annotations);
        return annotations;
      }).catch((error) => {
        console.log(error);
      });
};
