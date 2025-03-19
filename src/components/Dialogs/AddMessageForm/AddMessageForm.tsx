import { Formik, Form, FormikHelpers } from "formik";
import { maxLengthConstructor } from "../../../utils/validators/validators";
import * as Yup from "yup";
import { MyTextarea } from "../../common/FormControls/FormControls";

type ValuesType = {
  newMessageText: string
}

type PropsType = {
  onSubmit: (values: ValuesType) => void
}
const AddMessageForm: React.FC<PropsType>= ({ onSubmit }) => {
  const initialValues = {
    newMessageText: ""
  };

  const validate = Yup.object({
    newMessageText: maxLengthConstructor(10),
  });
  return (
    <>
      <Formik<ValuesType>
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values, {resetForm}) => {
          onSubmit(values)
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
