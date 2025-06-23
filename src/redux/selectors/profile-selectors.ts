import { AppStateType } from "../redux-store";

export const getUserProfileSelector = (state: AppStateType) => {
  return state.profilePage.profile;
}

export const getUserStatusSelector = (state: AppStateType) => {
  return state.profilePage.status;
}

export const getPostsSelector = (state: AppStateType) => state.profilePage.posts;