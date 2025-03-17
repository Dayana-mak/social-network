import { connect } from "react-redux";
import { login } from "../redux/auth-reducer";
import LoginForm from "./LoginForm";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";
import { FormikHelpers } from "formik";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type MapStatePropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};

type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => Promise<string | null>;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Login: React.FC<PropsType> = ({ login, isAuth, captchaUrl }) => {
  const onSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setStatus, setFieldValue }: FormikHelpers<LoginFormValues>
  ): Promise<void> => {
    const  { email, password, rememberMe, captcha } = values;
    const errorMessage = await login(email, password, rememberMe, captcha);
    if (errorMessage) {
      setStatus(errorMessage);
      setFieldValue("captcha", "");
    }
    setSubmitting(false);
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
