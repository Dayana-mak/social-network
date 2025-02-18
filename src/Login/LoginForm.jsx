import { Field, reduxForm } from "redux-form";
import { Input } from "../components/common/FormControls/FormControls";
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

export default reduxForm({ form: "login" })(LoginForm);
