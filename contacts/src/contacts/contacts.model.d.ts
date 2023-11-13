export interface contactDTO {
    id: number;
    name: string;
    mobilePhone: string;
    jobTitle: string;
    birthDate?: DateTime;
}

export interface contactCreationDTO {
    name: string;
    mobilePhone: string;
    jobTitle: string;
    birthDate?: DateTime;
}