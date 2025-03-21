import { DialogType, MessageType } from "../types/types";
import { InferActionsType } from "./redux-store";

const SEND_MESSAGE = "SN/DIALOGS/SEND-MESSAGE";

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

export type InitialStateType = typeof initialState;

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

type ActionTypes = InferActionsType<typeof dialogsActions>


export const dialogsActions = {
  sendMessage: (newMessageBody: string) => {
    return {type: SEND_MESSAGE, newMessageBody}
  }
}

export default dialogsReducer;