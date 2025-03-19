const SEND_MESSAGE = "SEND-MESSAGE";

type DialogType = {
  id: number
  name: string
}

type MessageType = {
  id: number
  text: string
}

const initialState = {
  dialogs: [
    {id: 1, name: 'Alex'},
    {id: 2, name: 'Jack'},
    {id: 3, name: 'Roberto'},
  ] as Array<DialogType>,
  messages: [
    {id: 1, text: "Hi"},
    {id: 2, text: "How are you?"},
    {id: 3, text: "Where are you"},
  ] as Array<MessageType>
}

type InitialStateType = typeof initialState;


const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:    
      const newMessage: MessageType = {
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

type ActionTypes = sendMessageActionType

type sendMessageActionType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessage = (newMessageBody: string): sendMessageActionType => {
  return {type: SEND_MESSAGE, newMessageBody}
}

export default dialogsReducer;