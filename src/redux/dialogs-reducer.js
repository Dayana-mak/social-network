const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

const initialState = {
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

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:    
      const newMessage = {
        id: state.messages.length + 1,
        text: action.newMessageBody
      }
      return {
        ...state,
        messages: [...state.messages, newMessage]
      };
    default:
      return state;
  }
}

export const sendMessage = (newMessageBody) => {
  return {type: SEND_MESSAGE, newMessageBody}
}
export default dialogsReducer;