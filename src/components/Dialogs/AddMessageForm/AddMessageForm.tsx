import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextareaMUI } from "../../common/FormControls/FormControls";
import { Box, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type ValuesType = {
  newMessageText: string;
};

type PropsType = {
  dialogId: number;
  onSubmit: (dialogId: number, values: ValuesType) => void;
};
const AddMessageForm: React.FC<PropsType> = ({ onSubmit, dialogId }) => {
  const initialValues = {
    newMessageText: "",
  };

  const validationSchema = Yup.object({
    newMessageText: Yup.string()
      .required("Message cannot be empty")
      .max(200, "Max 200 characters"),
  });
  return (
    <>
      <Formik<ValuesType>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(dialogId, values);
          resetForm();
        }}
      >
        <Form>
          <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
            <Box sx={{ flexGrow: 1 }}>
              <MyTextareaMUI
                label="newMessageText"
                name="newMessageText"
                placeholder="Write new message"
              />
            </Box>
            <IconButton
              type="submit"
              aria-label="Send message"
              color="primary"
              sx={{
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Form>
      </Formik>
    </>
  );
};

export default AddMessageForm;
