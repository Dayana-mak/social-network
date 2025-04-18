import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ResultCodesEnum } from "../api/api";
import { profileAPI } from "../api/profile-api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { AppStateType, InferActionsType } from "./redux-store";

const ADD_POST = "SN/PROFILE/ADD_POST" as const;
const SET_USER_PROFILE = "SN/PROFILE/SET_USER_PROFILE" as const;
const SET_USER_STATUS = "SN/PROFILE/SET_USER_STATUS" as const;
const SAVE_PHOTO_SUCCESS = "SN/PROFILE/SAVE_PHOTO_SUCCESS" as const;
const SAVE_PROFILE_SUCCESS = "SN/PROFILE/SAVE_PROFILE_SUCCESS" as const;
const TOGGLE_LIKE = "SN/PROFILE/TOGGLE_LIKE" as const;


const initialState = {
  posts: [
    { id: 1, text: "Hey, how is everything?", likesCount: 10, isLiked: false },
    { id: 2, text: "My new post", likesCount: 20, isLiked: false  },
    { id: 3, text: "I'm happy", likesCount: 200, isLiked: false  },
    { id: 4, text: "Nice to see you on my page", likesCount: 100, isLiked: false },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      const newPost: PostType = {
        id: state.posts.length + 1,
        text: action.newPostText,
        likesCount: 0,
        isLiked: false
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
    case TOGGLE_LIKE:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.postId) {
            const newIsLiked = !post.isLiked;
            return {
              ...post,
              isLiked: newIsLiked,
              likesCount: newIsLiked ? post.likesCount + 1 : post.likesCount - 1
            }
          }
          return post;
        })
      };
    default:
      return state;
  }
};

type ActionTypes = InferActionsType<typeof profileActions>;

export const profileActions = {
  addPost: (newPostText: string) => ({
    type: ADD_POST,
    newPostText,
  }),
  setUserProfile: (profile: ProfileType) => ({
    type: SET_USER_PROFILE,
    profile,
  }),
  setUserStatus: (status: string) => ({
    type: SET_USER_STATUS,
    status,
  }),
  savePhotoSuccess: (photos: PhotosType) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos,
  }),
  saveProfileSuccess: (profile: ProfileType) => ({
    type: SAVE_PROFILE_SUCCESS,
    profile,
  }),
  toggleLike: (postId: number) => ({
    type: TOGGLE_LIKE,
    postId
  })
};

type DispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch: DispatchType) => {
    const data = await profileAPI.getUserProfile(userId);
    dispatch(profileActions.setUserProfile(data));
  };

export const getUserStatus =
  (userId: number): ThunkType =>
  async (dispatch: DispatchType) => {
    const data = await profileAPI.getUserStatus(userId);
    dispatch(profileActions.setUserStatus(data));
  };

export const updateUserStatus =
  (status: string): ThunkType =>
  async (dispatch: DispatchType) => {
    const data = await profileAPI.updateUserStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.setUserStatus(status));
    }
  };

export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch: DispatchType) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(profileActions.savePhotoSuccess(data.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch: DispatchType, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === ResultCodesEnum.Success && userId !== null) {
      dispatch(getUserProfile(userId));
    }
  };
export default profileReducer;
