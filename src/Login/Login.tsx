import { connect } from "react-redux";
import { login } from "../redux/auth-reducer";
import LoginForm from "./LoginForm";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";
import { FormikHelpers } from "formik";
import { Box, Paper, Typography } from "@mui/material";

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
    const { email, password, rememberMe, captcha } = values;
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
    <Paper
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant={"h4"} textAlign="center" mb={2}>
          Login
        </Typography>
        <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        <Paper elevation={2}
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "secondary.main",
            width: "100%",
          }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>Test account</Typography>
          <Typography variant="body2">
            <strong>Email:</strong> free@samuraijs.com
          </Typography>
          <Typography variant="body2">
            <strong>Password:</strong> free
          </Typography>
        </Paper>
      </Box>
    </Paper>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
