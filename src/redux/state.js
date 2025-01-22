let state = {
  profilePage: {
    posts: [
      {id: 1, text:"Hey, why nobody love me?", likesCount: 10},
      {id: 2, text:"It's our new program! Hey!", likesCount: 20},
      {id: 3, text:"I'm tired", likesCount: 200}
    ]
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

export default state;