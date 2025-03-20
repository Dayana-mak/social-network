import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  ResultCodeForCaptchaEnum,
  ResultCodesEnum,
} from "../api/api";
import { securityAPI } from "../api/security-api";
import { authAPI } from "../api/auth-api";
import { AppStateType, InferActionsType } from "./redux-store";

const SET_USER_DATA = "SN/AUTH/SET_USER_DATA" as const;
const SET_CAPTCHA_URL = "SN/AUTH/SET_CAPTCHA_URL" as const;

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
  action: ActionTypes
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

export const authActions = {
  setAuthUserData: (
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
  ) => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuth },
  }),
  setCaptchaUrl: (captchaUrl: string) => ({
    type: SET_CAPTCHA_URL,
    payload: { captchaUrl },
  }),
};

type ActionTypes = InferActionsType<typeof authActions>;

type DispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>;
type ThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  ActionTypes
>;

export const getAuthUserData =
  (): ThunkType<Promise<void>> => async (dispatch: DispatchType) => {
    const data = await authAPI.getMe();

    if (data.resultCode === ResultCodesEnum.Success) {
      let { id, email, login } = data.data;
      dispatch(authActions.setAuthUserData(id, login, email, true));
    }
  };

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ): ThunkType<Promise<string | null>> =>
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

export const logout =
  (): ThunkType<Promise<void>> => async (dispatch: DispatchType) => {
    const data = await authAPI.logout();

    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(authActions.setAuthUserData(null, null, null, false));
    }
  };

export const getCaptchaUrl =
  (): ThunkType<Promise<void>> => async (dispatch: DispatchType) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;

    dispatch(authActions.setCaptchaUrl(captchaUrl));
  };

export default authReducer;
