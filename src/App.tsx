import { useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { initialize } from "./redux/app-reducer";
import { AppDispatchType } from "./redux/redux-store";
import { getIsAuth } from "./redux/selectors/auth-selectors";
import { getInitialized } from "./redux/selectors/app-selectors";

import Layout from "./Layout";
import ProfilePage from "./components/Profile/ProfilePage";
import DialogsPage from "./components/Dialogs/DialogsPage";
import UsersPage from "./components/Users/UsersPage";
import { LoginPage } from "./components/LoginPage/LoginPage";
import Preloader from "./components/common/Preloader";

import "./App.css";

const App: React.FC = () => {
  const dispatch: AppDispatchType = useDispatch();

  const initialized = useSelector(getInitialized);
  const isAuth = useSelector(getIsAuth);

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate to="/profile" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="profile/:userId?" element={<ProfilePage />} />
        <Route path="users/" element={<UsersPage />} />
        <Route path="login/" element={<LoginPage />} />
        <Route path="dialogs/:dialogId?" element={<DialogsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
