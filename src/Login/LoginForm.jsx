import { Form, Formik } from "formik";
import {
  MyTextInput,
  MyCheckbox,
} from "../components/common/FormControls/FormControls";
import { loginValidation } from "../utils/validators/validators";

const LoginForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false,
      }}
      onSubmit={onSubmit}
      validationSchema={loginValidation}
    >
      {({ isSubmitting, setStatus, status }) => (
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

          {status && <div>{status}</div>}

          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

/* import { Input } from "../components/common/FormControls/FormControls";
import { required } from "../utils/validators/validators";
import style from "../components/common/FormControls/FormControls.module.css";

const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          placeholder={"Email"}
          name={"email"}
          component={Input}
          validate={required}
        />
      </div>
      <div>
        <Field
          type="password"
          placeholder={"Password"}
          name={"password"}
          component={Input}
          validate={required}
        />
      </div>
      <div>
        <Field
          type="checkbox"
          placeholder={"Remember me"}
          name={"rememberMe"}
          component={"input"}
        />
        remember me
      </div>
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>login</button>
      </div>
    </form>
  );
};

export default (LoginForm);
 */
