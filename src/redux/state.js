const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

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

  addPost() {
    const text = this._state.profilePage.newPostText;

    const newPost = {
      id: 5,
      text: text,
      likesCount: 0
    }
  
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = "";
    this._callSubscriber(this._state);
  },
  updateNewPostText(newText) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber(this._state);
  },

  sendMessage() {
    const text = this._state.dialogsPage.newMessageText;
    
    const newMessage = {
      id: 4,
      text: text
    }
    this._state.dialogsPage.messages.push(newMessage);
    this._state.dialogsPage.newMessageText = "";
    this._callSubscriber(this._state);
  },
  updateNewMessageText(newText) {
    this._state.dialogsPage.newMessageText = newText;
    this._callSubscriber(this._state);
  },
  dispatch(action) {
    switch (action.type) {
      case ADD_POST: 
        this.addPost();
        break;
      case UPDATE_NEW_POST_TEXT:
        this.updateNewPostText(action.newText)
        break;
      case SEND_MESSAGE:
        this.sendMessage();
        break;
      case UPDATE_NEW_MESSAGE_TEXT: 
        this.updateNewMessageText(action.newText)
        break;
      default:
        console.log("action не найден")
    }
/*     if (action.type === ADD_POST ) {
      const text = this._state.profilePage.newPostText;

    const newPost = {
      id: 5,
      text: text,
      likesCount: 0
    }
  
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = "";
    this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } */
  }

}

export const addPostActionCreator = () => {
  return { type: ADD_POST}
}

export const updateNewPostTextActionCreator = (text) => {
  return {type: UPDATE_NEW_POST_TEXT, newText: text}
}

export const sendMessageActionCreator = () => {
  return {type: SEND_MESSAGE}
}

export const updateNewMessageTextActionCreator = (text) => {
  return {type: UPDATE_NEW_MESSAGE_TEXT, newText: text}
}
export default store;
window.store = store