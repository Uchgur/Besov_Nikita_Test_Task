import { Form, Formik, FormikHelpers } from "formik";
import Button from "../utils/Button";
import TextField from "../utils/TextField";
import * as Yup from 'yup';
import { contactCreationDTO } from "./contacts.model";

export default function ContactForm(props: contactFormProps) {
    
    return(
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}

            validationSchema={Yup.object({
                name: Yup.string().required('This field is required!').max(50, 'Max length is 50 characters').firstLetterUppercase(),
                dateOfBirth: Yup.date().nullable()   
            })}
        >
            {(formikProps) => (
            <Form>
                <TextField field="name" displayName="Name" />
                <TextField field="mobilePhone" displayName="Mobile Phone" />
                <TextField field="jobTitle" displayName="Job Title" />
                <h3>Birth Date</h3>
                <input name="birthDate" type="date" className="form-control" />
                <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
            </Form>
            )}  
        </Formik>
    )
}

interface contactFormProps {
    model: contactCreationDTO;
    onSubmit(values: contactCreationDTO, action: FormikHelpers<contactCreationDTO>): void;
}