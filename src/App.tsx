import "./App.css";
import { Route, Navigate, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import LoginPage from "./Login/Login";
import { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import Preloader from "./components/common/Preloader";
import { initialize } from "./redux/app-reducer";
import withRouter from "./hoc/withRouter";
import { compose } from "redux";
import { AppStateType } from "./redux/redux-store";
import HeaderContainer from "./components/Header/HeaderContainer";
import Layout from "./Layout";

type MapStatePropsType = {
  initialized: boolean;
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
          <Route path="/" element={<Navigate to="profile/" replace />} />
          <Route path="profile/:userId?" element={<ProfileContainer />} />
          <Route path="users/" element={<UsersContainer />} />
          <Route path="settings/" element={<Settings />} />
          <Route path="login/" element={<LoginPage />} />
          <Route path="dialogs/*" element={<DialogsContainer />} />
        </Route>
      </Routes>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  initialized: state.app.initialized,
});

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    { initialize }
  ),
  withRouter
)(App);
