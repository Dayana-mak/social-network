import { connect } from "react-redux";
import { login } from "../redux/auth-reducer";
import LoginForm from "./LoginForm";
import { Navigate } from "react-router-dom";

const Login = ({ login, isAuth, captchaUrl }) => {
  const onSubmit = async (
    { email, password, rememberMe, captcha },
    { setSubmitting, setStatus, setFieldValue }
  ) => {
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
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { login })(Login);
