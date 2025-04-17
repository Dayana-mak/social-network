import { Form, Formik } from "formik";
import { MyTextareaMUI } from "../../../common/FormControls/FormControls";
import * as Yup from "yup";
import { Box, Button, Paper } from "@mui/material";

const addPostFormValidation = Yup.object({
  newPostText: Yup.string()
    .required("Post cannot be empty")
    .max(30, "Post must be at most 30 characters"),
});

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
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
      validationSchema={addPostFormValidation}
    >
      <Form>
        <Paper
          sx={{
            p: 2
          }}
        >
          <MyTextareaMUI
            label="Write a new post"
            name="newPostText"
            placeholder="Write a new post"
            minRows={3}
          />

          <Box sx={{display: "flex", justifyContent: "flex-end", mt: 2}}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "6px",
                px: 3,
                "&:hover": {
                  backgroundColor: "primary.dark"
                },
              }}
            >
              Add post
            </Button>
          </Box>
        </Paper>
      </Form>
    </Formik>
  );
};

export default AddPostForm;
