import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { authAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI } from "../api/api";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

const initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null, //if null, then captcha is not required
};

type InitialStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

type ActionsType = SetAuthUserDataActionType | SetCaptchaUrlActionType;

type SetAuthUserDataActionPayloadType = {
  userId: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
};

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};
export const setAuthUserData = (
  userId: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, login, email, isAuth },
});

type SetCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL;
  payload: { captchaUrl: string };
};

export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl },
});

type DispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>
type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>

export const getAuthUserData = (): ThunkType<Promise<void>> => async (dispatch: DispatchType) => {
  const data = await authAPI.getMe();

  if (data.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserData(id, login, email, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType<Promise<string | null>> =>
  async (dispatch: DispatchType) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
      return null;
    } else {
      if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      const message =
        data.messages.length > 0 ? data.messages[0] : "Some error";
      return message;
    }
  };

export const logout = (): ThunkType<Promise<void>> => async (dispatch: DispatchType) => {
  const data = await authAPI.logout();

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType<Promise<void>> => async (dispatch: DispatchType) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;

  dispatch(setCaptchaUrl(captchaUrl));
};

export default authReducer;
