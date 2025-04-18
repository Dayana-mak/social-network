import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import {
  MyTextInputMUI,
  MyCheckboxMUI,
} from "../components/common/FormControls/FormControls";
import { loginValidation } from "../utils/validators/validators";
import s from "../components/common/FormControls/FormControls.module.css";
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
      validationSchema={loginValidation}
      context={{ captchaUrl }}
    >
      {({ isSubmitting, status, setStatus }: FormikProps<ValuesType>) => (
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
