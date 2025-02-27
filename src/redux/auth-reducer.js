import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

const initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      };
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}

export const setAuthUserData = (userId, login, email, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, login, email, isAuth }
});

export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl }
});

export const getAuthUserData = () => async (dispatch) => {
  const data = await authAPI.getMe();

  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserData(id, login, email, true));
  }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);

  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
    return null;
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    const message = data.messages.length > 0 ? data.messages[0] : "Some error";
    return message;
  }
}

export const logout = () => async (dispatch) => {
  const data = await authAPI.logout();

  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export const getCaptchaUrl = () => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;

  dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer;