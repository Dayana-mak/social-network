import { Form, Formik } from "formik";
import { MyTextarea, MyTextareaMUI } from "../../../common/FormControls/FormControls";
import { maxLengthConstructor } from "../../../../utils/validators/validators";
import * as Yup from "yup";
import { Box, Button, Paper } from "@mui/material";

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
            showErrorImmediately={true}
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
