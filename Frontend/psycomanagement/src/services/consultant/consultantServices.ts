import { API_BASE_URL } from "../../config/elementals";

const createHeaders = (): Record<string, string> => {
  const token = sessionStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const saveConsultant = async (
  myData: Record<string, any>
): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}consultants/new-consultant`, {
      method: "POST",
      body: JSON.stringify(myData),
      headers: createHeaders(),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateConsultant = async (
  data: Record<string, any>,
  oldData: Record<string, any>
): Promise<any> => {
  const oldValuesList: any[] = [];
  const newValuesList: any[] = [];
  const fieldModified: string[] = [];
  for (const key in data) {
    if (data[key] !== oldData[key]) {
      fieldModified.push(key);
      oldValuesList.push(oldData[key]);
      newValuesList.push(data[key]);
    }
  }
  const annotation = {
    id_consultant: oldData.id_consultant,
    id_therapist: oldData.id_therapist,
    creation_date: new Date(),
    fields: fieldModified,
    old_values: oldValuesList,
    new_values: newValuesList,
    justification: data.justification,
  };
  try {
    const response = await fetch(
      `${API_BASE_URL}consultant/update-consultant/${oldData.id_consultant}`,
      {
        method: "POST",
        body: JSON.stringify({
          fields: fieldModified,
          newValues: newValuesList,
          annotation: annotation,
        }),
        headers: createHeaders(),
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const get_annotations_by_consultant = async ({
  data,
}: {
  data: Record<string, any>;
}): Promise<any> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}annotations/${data.id_consultant}`,
      {
        method: "GET",
        headers: createHeaders(),
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
