import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import {
  MyTextInput,
  MyCheckbox,
} from "../components/common/FormControls/FormControls";
import { loginValidation } from "../utils/validators/validators";
import s from "../components/common/FormControls/FormControls.module.css";

type ValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type PropsType = {
  onSubmit: (values: ValuesType, formikHelpers: FormikHelpers<ValuesType>) => Promise<void>
  captchaUrl: string | null
}

const LoginForm: React.FC<PropsType> = ({ onSubmit, captchaUrl }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false,
        captcha: "",
      } as ValuesType} 
      onSubmit={onSubmit}
      validationSchema={loginValidation}
      context={{ captchaUrl }}
    >
      {({ isSubmitting, setStatus, status }: FormikProps<ValuesType>) => (
        <Form
          onInput={() => {
            if (status) setStatus(null);
          }}
        >
          <MyTextInput
            label="email"
            name="email"
            type="email"
            placeholder="Email"
          />

          <MyTextInput
            label="password"
            name="password"
            type="password"
            placeholder="Password"
          />

          <MyCheckbox name="rememberMe">Remember me</MyCheckbox>

          {captchaUrl && <img alt="captcha" src={captchaUrl} />}
          {captchaUrl && (
            <MyTextInput
              label="captcha"
              name="captcha"
              type="text"
              placeholder="Enter captcha symbols"
            />
          )}
          {status && <div className={s.error}>{status}</div>}

          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
