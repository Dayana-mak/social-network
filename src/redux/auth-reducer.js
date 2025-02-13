import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA"

const initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      };
   
    default:
      return state;
  }
}

export const setAuthUserData = (userId, login, email, isAuth) => ({type: SET_USER_DATA, payload: {userId, login, email, isAuth}});

export const getAuthUserData = () => (dispatch) => {
    return authAPI.getMe()
      .then(data => {
        if (data.resultCode === 0) {
          let {id, email, login} = data.data;
          dispatch(setAuthUserData(id, login, email, true));
        }
      })
}

export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(getAuthUserData())
        } else {
          const message = data.messages.length > 0 ? data.messages[0] : "Some error"
          dispatch(stopSubmit("login", {_error: message}))
        }
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    authAPI.logout()
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, false))
        }
      })
  }
}

export default authReducer;