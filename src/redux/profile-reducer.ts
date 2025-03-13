import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { profileAPI } from "../api/api";
import { PhotosType, ProfileType } from "../types/types";
import { AppStateType } from "./redux-store";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS";

type PostType = {
  id: number;
  text: string;
  likesCount: number;
};

const initialState = {
  posts: [
    { id: 1, text: "Hey, why nobody love me?", likesCount: 10 },
    { id: 2, text: "It's our new program! Hey!", likesCount: 20 },
    { id: 3, text: "I'm tired", likesCount: 200 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      const newPost: PostType = {
        id: state.posts.length + 1,
        text: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: { ...action.profile },
      };
    default:
      return state;
  }
};
type ActionsType =
  | AddPostActionType
  | SetUserProfileActionType
  | SetUserStatusActionType
  | SavePhotoSuccessActionType
  | SaveProfileSuccessActionType;

type AddPostActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPost = (newPostText: string): AddPostActionType => ({
  type: ADD_POST,
  newPostText,
});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

type SetUserStatusActionType = {
  type: typeof SET_USER_STATUS;
  status: string;
};
export const setUserStatus = (status: string): SetUserStatusActionType => ({
  type: SET_USER_STATUS,
  status,
});

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

type SaveProfileSuccessActionType = {
  type: typeof SAVE_PROFILE_SUCCESS;
  profile: ProfileType;
};
export const saveProfileSuccess = (
  profile: ProfileType
): SaveProfileSuccessActionType => ({ type: SAVE_PROFILE_SUCCESS, profile });

type DispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUserProfile = (userId: number): ThunkType => async (dispatch: DispatchType) => {
  const data = await profileAPI.getUserProfile(userId);
  dispatch(setUserProfile(data));
};

export const getUserStatus = (userId: number): ThunkType => async (dispatch: DispatchType) => {
  const data = await profileAPI.getUserStatus(userId);
  dispatch(setUserStatus(data));
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch: DispatchType) => {
  const data = await profileAPI.updateUserStatus(status);
  if (data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};

export const savePhoto = (file: File): ThunkType => async (dispatch: DispatchType) => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  }
};

export const saveProfile =
  (profile: ProfileType): ThunkType => async (dispatch: DispatchType, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0 && userId !== null) { 
      dispatch(getUserProfile(userId));
    }
  };
export default profileReducer;
