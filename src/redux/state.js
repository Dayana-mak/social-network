import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

const store = {
  _state: {
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
      ],
      newMessageText: ""
    }
  },
  _callSubscriber() {
    console.log("Component rendered")
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._callSubscriber(this._state);
    }

}

export default store;
window.store = store