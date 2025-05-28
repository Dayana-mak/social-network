import { connect, useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth-reducer";
import LoginForm from "./LoginForm";
import { Navigate } from "react-router-dom";
import { FormikHelpers } from "formik";
import { Box, Paper, Typography } from "@mui/material";
import { getCaptchaUrl, getIsAuth } from "../redux/selectors/auth-selectors";
import { AppDispatchType } from "../redux/redux-store";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export const LoginPage: React.FC = () => {
  const isAuth = useSelector(getIsAuth);
  const captchaUrl = useSelector(getCaptchaUrl);

  const dispatch: AppDispatchType = useDispatch();

  const onSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setStatus, setFieldValue }: FormikHelpers<LoginFormValues>
  ): Promise<void> => {
    const { email, password, rememberMe, captcha } = values;
    const errorMessage = await dispatch(login(email, password, rememberMe, captcha));
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
        <Paper
          elevation={2}
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "secondary.main",
            width: "100%",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Test account
          </Typography>
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

