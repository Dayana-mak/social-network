import "./App.css";
import { Route, Navigate, Routes } from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Settings from "./components/Settings/Settings";

import DialogsContainer from "./components/Dialogs/DialogsContainer";
import LoginPage from "./Login/Login";
import { Component } from "react";
import { connect } from "react-redux";
import Preloader from "./components/common/Preloader";
import { initialize } from "./redux/app-reducer";
import withRouter from "./hoc/withRouter";
import { compose } from "redux";
import { AppStateType } from "./redux/redux-store";
import Layout from "./Layout";
import UsersPage from "./components/Users/Users";

type MapStatePropsType = {
  initialized: boolean;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  initialize: () => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class App extends Component<PropsType> {
  componentDidMount() {
    this.props.initialize();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              this.props.isAuth ? (
                <Navigate to="/profile" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="profile/:userId?" element={<ProfileContainer />} />
          <Route path="users/" element={<UsersPage />} />
          <Route path="settings/" element={<Settings />} />
          <Route path="login/" element={<LoginPage />} />
          <Route path="dialogs/:dialogId?" element={<DialogsContainer />} />
        </Route>
      </Routes>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    { initialize }
  ),
  withRouter
)(App);
