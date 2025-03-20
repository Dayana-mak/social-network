import { instance, ResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum,  } from "./api";

export type GetMeDataType = {
  id: number
  email: string
  login: string
};

export type LoginDataType = {
  userId: number
};

export type LoginResultCodeType = ResultCodesEnum | ResultCodeForCaptchaEnum

export const authAPI = {
  getMe() {
    return instance.get<ResponseType<GetMeDataType>>("auth/me").then((response) => response.data);
  },

  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<ResponseType<LoginDataType, LoginResultCodeType>>("auth/login", { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },

  logout() {
    return instance.delete<ResponseType>("auth/login").then((response) => response.data);
  },
};
