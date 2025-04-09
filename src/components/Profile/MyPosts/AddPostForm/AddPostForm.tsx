import { Form, Formik } from "formik";
import { MyTextarea } from "../../../common/FormControls/FormControls";
import { maxLengthConstructor } from "../../../../utils/validators/validators";
import * as Yup from "yup";
import { Button } from "@mui/material";

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

        <Button type="submit">Add post</Button>
      </Form>
    </Formik>
  );
};

export default AddPostForm;
