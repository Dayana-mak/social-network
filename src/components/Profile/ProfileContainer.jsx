import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, getUserStatus, updateUserStatus } from "../../redux/profile-reducer";
import { Component } from "react";
import { useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.userId || 32100;
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }
  render () {
    return (
      <Profile {...this.props} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status
  }
}

const ProfileContainerWrapper = (props) => {
  const { userId } = useParams();
  return <ProfileContainer {...props} userId={userId} />
}


export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  withAuthRedirect
)(ProfileContainerWrapper)
