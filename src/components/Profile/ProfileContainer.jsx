import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, getUserStatus, updateUserStatus } from "../../redux/profile-reducer";
import { Component } from "react";
import { useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import withRouter from "../../hoc/withRouter";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId =  this.props.router.params.userId;
    if (!userId) {
      debugger;
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.router.navigate('/login');
        return;
      }
    }
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
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
  }
}

const ProfileContainerWrapper = (props) => {
  const { userId } = useParams();
  return <ProfileContainer {...props} userId={userId} />
}


export default compose(
  withRouter,
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus })
)(ProfileContainerWrapper)
