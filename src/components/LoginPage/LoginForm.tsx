import { Form, Formik, FormikHelpers } from "formik";
import { MyCheckboxMUI } from "../common/FormControls/CheckboxMUI";
import { MyTextInputMUI } from "../common/FormControls/TextInputMUI";
import { loginValidationSchema } from "../../utils/validators/validators";
import { Box, Button, Typography } from "@mui/material";

type ValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type PropsType = {
  onSubmit: (
    values: ValuesType,
    formikHelpers: FormikHelpers<ValuesType>
  ) => Promise<void>;
  captchaUrl: string | null;
};

const LoginForm: React.FC<PropsType> = ({ onSubmit, captchaUrl }) => {
  return (
    <Formik
      initialValues={
        {
          email: "",
          password: "",
          rememberMe: false,
          captcha: "",
        } as ValuesType
      }
      onSubmit={onSubmit}
      validationSchema={loginValidationSchema}
      context={{ captchaUrl }}
    >
      {({ isSubmitting, status, setStatus }) => (
        <Form
          onInput={() => {
            if (status) setStatus(null);
          }}
        >
          <MyTextInputMUI
            label="Email"
            name="email"
            type="email"
          />

          <MyTextInputMUI
            label="Password"
            name="password"
            type="password"
          />

          <MyCheckboxMUI name="rememberMe" label="Remember me" />

          {captchaUrl && (
            <>
              <Box my={2}>
                <img src={captchaUrl} alt="Captcha" />
              </Box>
              <MyTextInputMUI
                name="captcha"
                label="Enter captcha"
                type="text"
              />
            </>
          )}

          {status && (
            <Typography color="error" sx={{ mb: 2 }}>
              {status}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
