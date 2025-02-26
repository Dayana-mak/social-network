import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SAVE_PHOTO_SUCCES = "SAVE_PHOTO_SUCCES";
const SAVE_PROFILE_SUCCES = "SAVE_PROFILE_SUCCES";


const initialState = {
  posts: [
    { id: 1, text: "Hey, why nobody love me?", likesCount: 10 },
    { id: 2, text: "It's our new program! Hey!", likesCount: 20 },
    { id: 3, text: "I'm tired", likesCount: 200 }
  ],
  profile: null,
  status: ""
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.posts.length + 1,
        text: action.newPostText,
        likesCount: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost]
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
      };
    case SAVE_PHOTO_SUCCES:
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      };
    case SAVE_PROFILE_SUCCES:
      return {
        ...state,
        profile: {...action.profile}
      };
    default:
      return state;
  }
}

export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCES, photos });
export const saveProfileSuccess = (profile) => ({ type: SAVE_PROFILE_SUCCES, profile });


export const getUserProfile = (userId) => async (dispatch) => {
  const data = await profileAPI.getUserProfile(userId)
  dispatch(setUserProfile(data))
}

export const getUserStatus = (userId) => async (dispatch) => {
  const data = await profileAPI.getUserStatus(userId);
  dispatch(setUserStatus(data));
}

export const updateUserStatus = (status) => async (dispatch) => {
  const data = await profileAPI.updateUserStatus(status)
  if (data.resultCode === 0) {
    dispatch(setUserStatus(status))
  }
}

export const savePhoto = (file) => async (dispatch) => {
  const data = await profileAPI.savePhoto(file)
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos))
  }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile)
  if (data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  }
}
export default profileReducer;