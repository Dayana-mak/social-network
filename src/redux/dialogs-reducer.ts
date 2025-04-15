import { DialogType } from "../types/types";
import { InferActionsType } from "./redux-store";
import JohnnyDeppAvatar from "../assets/images/dialogs-avatars/JohnnyDeppAvatar.jpeg";
import LeonardoDiCaprioAvatar from "../assets/images/dialogs-avatars/LeonardoDiCaprioAvatar.jpeg";
import MargotRobbieAvatar from "../assets/images/dialogs-avatars/MargotRobbieAvatar.jpeg";

const SEND_MESSAGE = "SN/DIALOGS/SEND-MESSAGE" as const;
const SET_ACTIVE_DIALOG = "SN/DIALOGS/SET-ACTIVE-DIALOG" as const;

const initialState = {
  dialogs: [
    {
      id: 1,
      name: "Leonardo DiCaprio",
      avatar: LeonardoDiCaprioAvatar,
      messages: [
        {
          id: 1,
          fromMe: false,
          text: "Hey! How are you?",
          date: "2025-04-15T14:00:00",
        },
        {
          id: 2,
          fromMe: true,
          text: "Hi Alice, I’m good! You?",
          date: "2025-04-15T14:10:00",
        },
        {
          id: 3,
          fromMe: false,
          text: "Great! See you tomorrow!",
          date: "2025-04-15T14:32:00",
        },
      ],
    },
    {
      id: 2,
      name: "Johnny Depp",
      avatar: JohnnyDeppAvatar,
      messages: [
        {
          id: 1,
          fromMe: false,
          text: "Can we move the meeting?",
          date: "2025-04-10T17:30:00",
        },
        {
          id: 2,
          fromMe: true,
          text: "Sure, when works for you?",
          date: "2025-04-10T17:45:00",
        },
        {
          id: 3,
          fromMe: false,
          text: "Tomorrow afternoon?",
          date: "2025-04-10T18:00:00",
        },
      ],
    },
    {
      id: 3,
      name: "Margot Robbie",
      avatar: MargotRobbieAvatar,
      messages: [
        {
          id: 1,
          fromMe: true,
          text: "Hey Bob, long time!",
          date: "2024-04-11T12:00:00",
        },
        {
          id: 2,
          fromMe: false,
          text: "Yeah! Let’s catch up soon!",
          date: "2024-04-11T12:15:00",
        },
      ],
    },
  ] as Array<DialogType>,
  activeDialogId: null as number | null,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        dialogs: state.dialogs.map((dialog) => {
          if (dialog.id === state.activeDialogId) {
            return {
              ...dialog,
              messages: [...dialog.messages, action.payload],
            };
          }
          return dialog;
        }),
      };
    case SET_ACTIVE_DIALOG:
      return {
        ...state,
        activeDialogId: action.payload,
      };
    default:
      return state;
  }
};

type ActionTypes = InferActionsType<typeof dialogsActions>;

export const dialogsActions = {
  setActiveDialog: (id: number) => ({ type: SET_ACTIVE_DIALOG, payload: id }),
  sendMessage: (text: string) => ({
    type: SEND_MESSAGE,
    payload: {
      id: Date.now(),
      fromMe: true,
      text,
      date: new Date().toISOString(),
    },
  }),
};

export default dialogsReducer;
