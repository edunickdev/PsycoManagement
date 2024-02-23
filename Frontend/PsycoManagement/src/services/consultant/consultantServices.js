import { API_BASE_URL } from "../../config/elementals";

export const saveConsultant = (myData) => {
  return fetch(`${API_BASE_URL}consultants/new-consultant`, {
    method: "POST",
    body: JSON.stringify(myData),
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token"),
    },
  }).then((response) => response.json());
};

export const updateConsultant = (data, oldData) => {
  console.log(`esta es la data nueva que recibo: ${JSON.stringify(data)}`);
  console.log(`esta es la data vieja que recibo: ${JSON.stringify(oldData)}`);
  // compare data and oldData info, verify if there are changes, if yes then add the oldvalues into a list and
  // too store the new values into another list, then send the request to the server
  let oldValuesList = [];
  let newValuesList = [];
  let fieldModified = [];
  for (const key in data) {
    if (data[key] !== oldData[key]) {
      fieldModified.push(key);
      oldValuesList.push(oldData[key]);
      newValuesList.push(data[key]);
    }
  }
  let annotation = {
    id_consultant: oldData.id_consultant,
    id_therapist: oldData.id_therapist,
    creation_date: new Date(),
    fields: fieldModified,
    old_values: oldValuesList,
    new_values: newValuesList,
    justification: data.justification,
  };
  console.log(
    `esta es la annotation que se crea: ${JSON.stringify(annotation)}`
  );
  return fetch(
    `${API_BASE_URL}consultant/update-consultant/${oldData.id_consultant}`,
    {
      method: "POST",
      body: JSON.stringify({
        fields: fieldModified,
        newValues: newValuesList,
        annotation: annotation,
      }),
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

//   return fetch(`${API_BASE_URL}consultants/update-consultant/{}`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//       token: sessionStorage.getItem("token"),
//     },
//   }).then((response) => response.json());
// };

export const get_annotations_by_consultant = ({ data }) => {
  return fetch(`${API_BASE_URL}annotations/${data.id_consultant}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((annotations) => {
      return annotations;
    })
    .catch((error) => {
      console.log(error);
    });
};
