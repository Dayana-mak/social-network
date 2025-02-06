import { Component } from "react"
import Header from "./Header";
import { checkIsAuth } from "../../redux/auth-reducer";
import { connect } from "react-redux";

class HeaderContainer extends Component{
  componentDidMount() {
    this.props.checkIsAuth()
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

export default connect(mapStateToProps, {checkIsAuth})(HeaderContainer);