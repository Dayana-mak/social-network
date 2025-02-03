import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";
import axios from "axios"
import { Component } from "react";

class ProfileContainer extends Component {
  componentDidMount() {
    console.log("ComponentDidMount вызван")
    axios.get("https://social-network.samuraijs.com/api/1.0/profile/2").then(response => {
        this.props.setUserProfile(response.data);
    })
  }
  render () {
    console.log({...this.props})
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

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);