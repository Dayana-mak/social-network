import { connect } from "react-redux";
import { login } from "../redux/auth-reducer";
import LoginForm from "./LoginForm";
import { Navigate } from "react-router-dom";

const Login = ({ login, isAuth }) => {
  const onSubmit = ({ email, password, rememberMe }) => {
    login(email, password, rememberMe);
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
