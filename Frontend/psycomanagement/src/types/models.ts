export interface HomeCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface Consultant {
  id_consultant: string;
  id_therapist?: string;
  names: string;
  last_names: string;
  phone: string;
  type_document: string;
  document_number: string;
  email: string;
  address: string;
  city: string;
  regimen: string;
  eps: string;
  status: string;
  birth_date: string;
  isChild: boolean;
  names_responsible?: string;
  phone_responsible?: string;
  email_responsible?: string;
  annotations: number;
  creation_date?: string;
  last_update?: string;
  justification?: string;
  [key: string]: unknown;
}

export interface ProfileInfo {
  data: {
    register_date: string;
    birth_date: string;
    names: string;
    age: number;
    genre: string;
    email: string;
    [key: string]: unknown;
  };
}

export interface CalendarEventResponse {
  title: string;
  start_date: string;
  end_date: string;
  [key: string]: unknown;
}

export interface CalendarDisplayEvent {
  title: string;
  start: Date;
  end: Date;
}
