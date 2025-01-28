const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const initialState = {
  posts: [
    {id: 1, text:"Hey, why nobody love me?", likesCount: 10},
    {id: 2, text:"It's our new program! Hey!", likesCount: 20},
    {id: 3, text:"I'm tired", likesCount: 200}
  ],
  newPostText: ""
}
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: 
      const newPost = {
        id: state.posts.length + 1,
        text: state.newPostText,
        likesCount: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ""
      }
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText
      };
    default:
      return state;
  }
}

export const addPostActionCreator = () => {
  return { type: ADD_POST}
}

export const updateNewPostTextActionCreator = (text) => {
  return {type: UPDATE_NEW_POST_TEXT, newText: text}
}

export default profileReducer;