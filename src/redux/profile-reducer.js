import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";


const initialState = {
  posts: [
    {id: 1, text:"Hey, why nobody love me?", likesCount: 10},
    {id: 2, text:"It's our new program! Hey!", likesCount: 20},
    {id: 3, text:"I'm tired", likesCount: 200}
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

    
    default:
      return state;
  }
}

export const addPost = (newPostText) => ({ type: ADD_POST, newPostText});
export const setUserProfile = (profile) =>({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) =>({type: SET_USER_STATUS, status});


export const getUserProfile = (userId) => {
  return (dispatch) => {
    profileAPI.getUserProfile(userId)
      .then(data => {
        dispatch(setUserProfile(data))
      })
  }
}

export const getUserStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getUserStatus(userId)
      .then(data => {
        dispatch(setUserStatus(data))
      })
  }
}
export const updateUserStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateUserStatus(status)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setUserStatus(status))
        }
      })
  }
}
export default profileReducer;