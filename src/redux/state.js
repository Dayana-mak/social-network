import { renderEntireTree } from "../render";

const state = {
  profilePage: {
    posts: [
      {id: 1, text:"Hey, why nobody love me?", likesCount: 10},
      {id: 2, text:"It's our new program! Hey!", likesCount: 20},
      {id: 3, text:"I'm tired", likesCount: 200}
    ],
    newPostText: ""
  },
  dialogsPage: {
    dialogs: [
      {id: 1, name: 'Alex'},
      {id: 2, name: 'Jack'},
      {id: 3, name: 'Roberto'},
    ],
    messages: [
      {id: 1, text: "Hi"},
      {id: 2, text: "How are you?"},
      {id: 3, text: "Where are you"},
    ]
  }
}

export const addPost = () => {
  const text = state.profilePage.newPostText;
  
  const newPost = {
    id: 5,
    text: text,
    likesCount: 0
  }

  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = "";
  renderEntireTree(state);
}

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  renderEntireTree(state);
}

export default state;