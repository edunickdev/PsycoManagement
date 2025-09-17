import { API_BASE_URL } from "../../config/elementals";
import { Consultant } from "../../types/models";

export const saveConsultant = async (myData: Consultant): Promise<unknown> => {
  const response = await fetch(`${API_BASE_URL}consultants/new-consultant`, {
    method: "POST",
    body: JSON.stringify(myData),
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    throw new Error(`Error creating consultant: ${response.statusText}`);
  }

  return response.json();
};

type ConsultantUpdateData = Partial<Consultant> & { justification?: string };

export const updateConsultant = async (
  data: ConsultantUpdateData,
  oldData: Consultant
): Promise<unknown> => {
  const oldValuesList: unknown[] = [];
  const newValuesList: unknown[] = [];
  const fieldModified: string[] = [];

  (Object.keys(data) as (keyof ConsultantUpdateData)[]).forEach((key) => {
    if (key === "justification") {
      return;
    }

    const newValue = data[key];
    const oldValue = oldData[key as keyof Consultant];
    if (newValue !== undefined && newValue !== oldValue) {
      fieldModified.push(String(key));
      oldValuesList.push(oldValue);
      newValuesList.push(newValue);
    }
  });

  const annotation = {
    id_consultant: oldData.id_consultant,
    id_therapist: oldData.id_therapist,
    creation_date: new Date().toISOString(),
    fields: fieldModified,
    old_values: oldValuesList,
    new_values: newValuesList,
    justification: data.justification,
  };

  const response = await fetch(
    `${API_BASE_URL}consultant/update-consultant/${oldData.id_consultant}`,
    {
      method: "POST",
      body: JSON.stringify({
        fields: fieldModified,
        newValues: newValuesList,
        annotation,
      }),
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error updating consultant: ${response.statusText}`);
  }

  return response.json();
};

export interface ConsultantAnnotation {
  id_consultant: string;
  creation_date: string;
  fields: string[];
  old_values: unknown[];
  new_values: unknown[];
  justification?: string;
  [key: string]: unknown;
}

export const getAnnotationsByConsultant = async (
  consultantId: string,
  signal?: AbortSignal
): Promise<ConsultantAnnotation[]> => {
  const response = await fetch(`${API_BASE_URL}annotations/${consultantId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Error fetching annotations: ${response.statusText}`);
  }

  const annotations: ConsultantAnnotation[] = await response.json();
  return annotations;
};
