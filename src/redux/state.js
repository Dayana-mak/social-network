let store = {
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
      ]
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
  dispatch(action) {
    if (action.type === "ADD-POST") {
      const text = this._state.profilePage.newPostText;

    const newPost = {
      id: 5,
      text: text,
      likesCount: 0
    }
  
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = "";
    this._callSubscriber(this._state);
    } else if (action.type === "UPDATE-NEW-POST-TEXT") {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    }
  }

}

export default store;