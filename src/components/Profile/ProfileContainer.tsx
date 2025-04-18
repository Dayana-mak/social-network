import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfile,
  getUserStatus,
  savePhoto,
  saveProfile,
  updateUserStatus,
} from "../../redux/profile-reducer";
import { Component } from "react";
import { compose } from "redux";
import withRouter, { RouterProps } from "../../hoc/withRouter";
import { ProfileType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

type MapStatePropsType = {
  profile: ProfileType;
  status: string;
  authorizedUserId: number | null;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  updateUserStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & RouterProps;

class ProfileContainer extends Component<PropsType> {
  refreshProfile() {
    const idStr = this.props.router.params.userId;
    let userId: number | null = idStr ? +idStr : null;

    if (!userId && !this.props.isAuth) {
      this.props.router.navigate("/login");
      return;
    }
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    if (userId !== null) {
      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
    const currentUserId = this.props.router.params.userId;
    const prevUserId = prevProps.router.params.userId;

    if (currentUserId !== prevUserId) {
      this.refreshProfile();
    }

    if (!this.props.isAuth && !currentUserId) {
      this.props.router.navigate("/login");
    }
  }
  render() {
    return (
      <Profile
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        isOwner={!this.props.router.params.userId}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
  })
)(ProfileContainer);
