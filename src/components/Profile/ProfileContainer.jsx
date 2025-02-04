import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";
import axios from "axios"
import { Component } from "react";
import { useParams } from "react-router-dom";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.userId || 2;
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
        this.props.setUserProfile(response.data);
    })
  }
  render () {
    return (
      <Profile {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile
  }
}

const ProfileContainerWrapper = (props) => {
  const { userId } = useParams();

  return <ProfileContainer {...props} userId={userId} />
}

export default connect(mapStateToProps, { setUserProfile })(ProfileContainerWrapper);