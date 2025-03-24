import { Form, Formik, FormikHelpers } from "formik";
import { MyTextarea } from "../../../common/FormControls/FormControls";
import { maxLengthConstructor } from "../../../../utils/validators/validators";
import * as Yup from "yup";

const addPostFormValidation = Yup.object({
  newPostText: maxLengthConstructor(200)
})

export type AddPostFormValuesType = {
  newPostText: string
}

type PropsType = {
  onSubmit: (values: AddPostFormValuesType) => void
}

const AddPostForm: React.FC<PropsType> = ({ onSubmit }) => {
  return (
    <Formik<AddPostFormValuesType>
    initialValues={{ newPostText: "" }} 
    onSubmit={(values, {resetForm}) => {
      onSubmit(values);
      resetForm();
    }}
    validationSchema={addPostFormValidation}>
      <Form>
        <MyTextarea
          label="newPostText"
          name="newPostText"
          type="text"
          placeholder="Write new post"
          showErrorImmediately={true}
        />

        <button type="submit">Add post</button>
      </Form>
    </Formik>
  );
};

export default AddPostForm;
