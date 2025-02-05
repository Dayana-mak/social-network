import { Component } from "react"
import Header from "./Header";
import { setAuthUserData } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import { usersAPI } from "../../api/api";

class HeaderContainer extends Component{
  componentDidMount() {
    usersAPI.checkIsAuth()
      .then(response => {
        if (response.resultCode === 0) {
          let {id, email, login} = response.data;
          this.props.setAuthUserData(id, login, email);
        }
      })
  }

  render() {
    return (
        <Header {...this.props} />
      );
  }
  
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    email: state.auth.email
  }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);