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
        ...action.data,
        isAuth: true
      };
   
    default:
      return state;
  }
}

export const setAuthUserData = (userId, login, email) => ({type: SET_USER_DATA, data: {userId, login, email}});

export const getAuthUserData = () => {
  return (dispatch) => {
    authAPI.getMe()
      .then(data => {
        if (data.resultCode === 0) {
          let {id, email, login} = data.data;
          dispatch(setAuthUserData(id, login, email));
        }
      })
  }
}

export const loginUser = () => {
  return (dispatch) => {
    authAPI.loginUser()
      .then(data => {
        if (data.resultCode === 0) {
          
        }
      })
  }
}

export default authReducer;