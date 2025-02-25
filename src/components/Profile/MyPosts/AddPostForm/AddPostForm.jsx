import { Form, Formik } from "formik";
import { MyTextarea } from "../../../common/FormControls/FormControls";

const AddPostForm = ({ onSubmit }) => {
  return (
    <Formik 
    initialValues={{ newPostText: "" }} 
    onSubmit={(values, {resetForm}) => {
      onSubmit(values.newPostText);
      resetForm();
    }}>
      <Form>
        <MyTextarea
          label="newPostText"
          name="newPostText"
          type="text"
          placeholder="Write new post"
        />

        <button type="submit">Add post</button>
      </Form>
    </Formik>
  );
};

export default AddPostForm;
