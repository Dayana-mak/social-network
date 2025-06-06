import { Component } from "react";
import Header from "./Header";
import { getAuthUserData, logout } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  isAuth: boolean;
  login: string | null;
  email: string | null;
  profileAvatar: string | null | undefined;
};

type MapDispatchPropsType = {
  getAuthUserData: () => void;
  logout: () => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class HeaderContainer extends Component<PropsType> {
  render() {
    return (
      <Header
        logout={this.props.logout}
        isAuth={this.props.isAuth}
        login={this.props.login}
        profileAvatar={this.props.profileAvatar}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    email: state.auth.email,
    profileAvatar: state.profilePage.profile?.photos.small
  };
};

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, { getAuthUserData, logout })(HeaderContainer);
