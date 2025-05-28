import { AppStateType } from "../redux-store";

export const getIsAuth = (state: AppStateType): boolean => {
  return state.auth.isAuth;
}
export const getCaptchaUrl = (state: AppStateType): string | null => {
  return state.auth.captchaUrl;
}
export const getAuthUserId = (state: AppStateType): number | null => {
  return state.auth.userId;
}
export const getAuthLogin = (state: AppStateType): string | null => {
  return state.auth.login;
}
export const getAuthEmail = (state: AppStateType): string | null => {
  return state.auth.email;
}