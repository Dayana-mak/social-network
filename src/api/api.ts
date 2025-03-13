import axios from "axios";
import { PhotosType, ProfileType, UserType } from "../types/types";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "652b3824-fcfd-42f5-994b-679eaa6e088c",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

type GetUsersResponseType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

type FollowResponseType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: any
}

type UnfollowResponseType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: any
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  follow(userId: number) {
    return instance.post<FollowResponseType>(`follow/${userId}`).then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance
      .delete<UnfollowResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
};

type UpdateUserStatusResponseType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: any
}

type SaveProfileResponseType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: any
}

type SavePhotoResponseType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: {
    photos: PhotosType
  }
}

export const profileAPI = {
  getUserProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`).then((response) => response.data);
  },

  getUserStatus(userId: number) {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then((response) => response.data);
  },

  updateUserStatus(status: string) {
    return instance
      .put<UpdateUserStatusResponseType>(`profile/status/`, { status: status })
      .then((response) => response.data);
  },

  saveProfile(profile: ProfileType) {
    return instance.put<SaveProfileResponseType>(`profile/`, profile).then((response) => response.data);
  },

  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put<SavePhotoResponseType>(`profile/photo/`, formData)
      .then((response) => response.data);
  },
};

type GetMeResponseType = {
  data: {
    id: number
    email: string
    login: string
  };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

type LoginResponseType = {
  data: {
    userId: number
  };
  resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum;
  messages: Array<string>;
};

type LogoutResponseType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: any
};

export const authAPI = {
  getMe() {
    return instance.get<GetMeResponseType>("auth/me").then((response) => response.data);
  },

  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<LoginResponseType>("auth/login", { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },

  logout() {
    return instance.delete<LogoutResponseType>("auth/login").then((response) => response.data);
  },
};

type GetCaptchaUrlResponseType = {
  url: string
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<GetCaptchaUrlResponseType>("security/get-captcha-url")
      .then((response) => response.data);
  },
};
