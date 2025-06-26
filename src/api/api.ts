import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "652b3824-fcfd-42f5-994b-679eaa6e088c",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("sn-token");
  
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
