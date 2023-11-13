import React from "react"
import Modal from "../utils/Modal";
import { DesktopModalContainer, Header } from "../utils/ModalPopup.styles";
import { contactCreationDTO} from "./contacts.model";
import axios from "axios";
import ContactForm from "./contactForm";
import { convertContactToFormData } from "../utils/FormDataUtil";

interface CreateContactProps {
    isModalActive: boolean;
    onBackdropClick: () => void;
    onContactCreated: () => void;
}

const CreateContact: React.FC<CreateContactProps> = ({onBackdropClick, isModalActive, onContactCreated}) => {

    async function create (contact: contactCreationDTO) {
        const formData = convertContactToFormData(contact);
        
        await axios({
            method: 'post',
            url: 'https://localhost:7047/api/contacts',
            data: formData,
            headers: {'Content-Type': 'application/json'}
        });

        onContactCreated();
        onBackdropClick();
    }
    
    if (!isModalActive) {
        return null;
    }

    return (<Modal onBackdropClick={onBackdropClick}>
        <DesktopModalContainer>
            <Header>Create new contact</Header>
            <ContactForm model={{name: '', mobilePhone: '', jobTitle: '', birthDate: undefined}} onSubmit={async values => await create(values)} />
        </DesktopModalContainer>
    </Modal>)
}

export default CreateContact;