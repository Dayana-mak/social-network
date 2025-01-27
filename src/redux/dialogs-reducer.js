const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const text = state.newMessageText;
    
      const newMessage = {
        id: 4,
        text: text
      }
      state.messages.push(newMessage);
      state.newMessageText = "";
      return state;
    case UPDATE_NEW_MESSAGE_TEXT: 
      state.newMessageText = action.newText;
      return state;
    default:
      return state;
  }
}

export const sendMessageActionCreator = () => {
  return {type: SEND_MESSAGE}
}

export const updateNewMessageTextActionCreator = (text) => {
  return {type: UPDATE_NEW_MESSAGE_TEXT, newText: text}
}

export default dialogsReducer;