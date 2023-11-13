import React, { useEffect, useState } from "react";
import Modal from "../utils/Modal";
import { DesktopModalContainer, Header } from "../utils/ModalPopup.styles";
import { contactCreationDTO, contactDTO } from "./contacts.model";
import axios from "axios";
import ContactForm from "./contactForm";
import { convertContactToFormData } from "../utils/FormDataUtil";
import { useHistory, useParams } from "react-router-dom";

interface EditContactProps {
  isModalActive: boolean;
  onBackdropClick: () => void;
  onContactEdited: () => void;
}

const EditContact: React.FC<EditContactProps> = ({
  onBackdropClick,
  isModalActive,
  onContactEdited,
}) => {
  const { id }: any = useParams();
  const [contact, setContact] = useState<contactCreationDTO>();
  const history = useHistory();

  function transform(contact: contactDTO): contactCreationDTO {
    return {
      name: contact.name,
      mobilePhone: contact.mobilePhone,
      jobTitle: contact.jobTitle,
      birthDate: new Date(contact.birthDate),
    };
  }

  useEffect(() => {
    axios.get(`https://localhost:7047/api/contacts/${id}`).then((response) => {
      setContact(transform(response.data));
    });
  }, [id]);

  async function edit(contactToEdit: contactCreationDTO) {
    const formData = convertContactToFormData(contactToEdit);
    await axios({
      method: "put",
      url: `https://localhost:7047/api/contacts/${id}`,
      data: formData,
      headers: { "Content-Type": "application/json" },
    });

    onContactEdited();
    onBackdropClick();
    history.push("/");
  }

  async function deleteContact() {
    await axios.delete(`https://localhost:7047/api/contacts/${id}`);

    onContactEdited();
    onBackdropClick();
    history.push("/");
  }

  if (!isModalActive) {
    history.push("/");
    return null;
  }

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <DesktopModalContainer>
        <Header>Edit contact</Header>
        {contact ? (
          <>
            <ContactForm
              model={contact!}
              onSubmit={async (value) => await edit(value)}
            />
            <button className="btn btn-danger" onClick={deleteContact}>Delete</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </DesktopModalContainer>
    </Modal>
  );
};

export default EditContact;
