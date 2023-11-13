import { contactCreationDTO } from "../contacts/contacts.model";

export function convertContactToFormData(contact: contactCreationDTO) {
    const formData = new FormData();

    formData.append('name', contact.name);
    formData.append('mobilePhone', contact.mobilePhone);
    formData.append('jobTitle', contact.jobTitle);

    if (contact.birthDate) {
        formData.append('birthDate', formatDate(contact.birthDate));
    }

    return formData;
}

function formatDate(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}