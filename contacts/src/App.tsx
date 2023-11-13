import "./App.css";
import configureValidations from "./Validations";
import { useEffect, useState } from "react";
import axios from "axios";
import { contactDTO } from "./contacts/contacts.model";
import CreateContact from "./contacts/createContact";
import GenericList from "./utils/GenericList";
import EditContact from "./contacts/editContact";
import Button from "./utils/Button";
import {
  BrowserRouter,
  Link,
  Route,
} from "react-router-dom";

configureValidations();

const App = () => {
  const [isCreateModalActive, setCreateModalActive] = useState<boolean>(false);
  const [isEditModalActive, setEditModalActive] = useState<boolean>(false);
  const [contacts, setContacts] = useState<contactDTO[]>([]);

  const toggleCreateModal = () => {
    setCreateModalActive((wasModalActive) => !wasModalActive);
  };
  const toggleEditModal = () => {
    setEditModalActive((wasModalActive) => !wasModalActive);
  };

  const loadContacts = () => {
    axios.get("https://localhost:7047/api/contacts").then((response) => {
      setContacts(response.data);
    });
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <>
      <h3>Contacts</h3>

      <Button onClick={toggleCreateModal}>Create Contact</Button>
      <CreateContact
        isModalActive={isCreateModalActive}
        onBackdropClick={toggleCreateModal}
        onContactCreated={loadContacts}
      />

      <GenericList list={contacts}>
        <table className="table table-striped">
          <thead>
            <td></td>
            <td>Name</td>
            <td></td>
            <td>Mobile Phone</td>
            <td></td>
            <td>Job Title</td>
          </thead>
          <tbody>
            {contacts?.map((contact) => (
              <tr key={contact.id}>
                <td></td>
                <td>{contact.name}</td>
                <td></td>
                <td>{contact.mobilePhone}</td>
                <td></td>
                <td>{contact.jobTitle}</td>
                <td></td>
                <td>{contact.id}</td>
                <td>
                  <BrowserRouter>
                    <Link className="btn btn-primary" onClick={toggleEditModal} to={`${contact.id}`}>
                      Edit
                    </Link>
                    <Route path="/:id">
                      <EditContact
                        isModalActive={isEditModalActive}
                        onBackdropClick={toggleEditModal}
                        onContactEdited={loadContacts}
                      />
                    </Route>
                  </BrowserRouter>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericList>
    </>
  );
};

export default App;
