import { PhotosType, ProfileType } from "../types/types";
import { instance, ResponseType } from "./api";

export type SavePhotoDataType = {
  photos: PhotosType;
};

export const profileAPI = {
  getUserProfile(userId: number) {
    return instance
      .get<ProfileType>(`profile/${userId}`)
      .then((response) => response.data);
  },

  getUserStatus(userId: number) {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then((response) => response.data);
  },

  updateUserStatus(status: string) {
    return instance
      .put<ResponseType>(`profile/status/`, { status: status })
      .then((response) => response.data);
  },

  saveProfile(profile: ProfileType) {
    return instance
      .put<ResponseType>(`profile/`, profile)
      .then((response) => response.data);
  },

  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put<ResponseType<SavePhotoDataType>>(`profile/photo/`, formData)
      .then((response) => response.data);
  },
};
