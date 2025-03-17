import { Formik, Field, ErrorMessage, Form } from "formik";
import { maxLengthConstructor } from "../../../utils/validators/validators";
import * as Yup from "yup";
import { MyTextarea } from "../../common/FormControls/FormControls";

const AddMessageForm = ({ onSubmit }) => {
  const initialValues = {
    newMessageText: "",
  };

  const validate = Yup.object({
    newMessageText: maxLengthConstructor(10),
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values, {resetForm}) => {
          onSubmit(values.newMessageText)
          resetForm();  
        }}
      >
        <Form>
          <MyTextarea
            label="newMessageText"
            name="newMessageText"
            type="text"
            placeholder="Write new message"
            showErrorImmediately={true}
          />

          <button type="submit">Send</button>
        </Form>
      </Formik>
    </>
  );
};

export default AddMessageForm;
