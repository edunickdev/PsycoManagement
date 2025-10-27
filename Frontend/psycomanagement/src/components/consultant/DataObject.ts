interface ConsultantData {
    names: string;
    last_names: string;
    phone: string;
    type_document: string;
    document_number: string;
    email: string;
    address: string;
    city: string;
    country: string;
    regimen: string;
    eps: string;
    status: string;
    birth_date: string;
    isChild: boolean;
    names_responsible: string;
    phone_responsible: string;
    email_responsible: string;
    annotations: number;
}

const NewData: ConsultantData = {
    names: "",
    last_names: "",
    phone: "",
    type_document: "CC",
    document_number: "",
    email: "",
    address: "",
    city: "",
    country: "",
    regimen: "",
    eps: "",
    status: "",
    birth_date: "",
    isChild:  false,
    names_responsible: "",
    phone_responsible: "",
    email_responsible: "",
    annotations: 0,
};


export default NewData