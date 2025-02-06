import { Component } from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

export const withAuthRedirect = (InitialComponent) => {
  
  class RedirectComponent extends Component {
    render() {
      if (!this.props.isAuth) {
        return <Navigate to="/login"/>
      }
      
      return <InitialComponent  {...this.props}/>
    }
  }

  const ConnectedAuthRedirect = connect(mapStateToProps)(RedirectComponent);

  return ConnectedAuthRedirect;
}