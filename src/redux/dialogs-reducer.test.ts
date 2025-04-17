import { DialogType } from "../types/types";
import dialogsReducer, { dialogsActions } from "./dialogs-reducer";

const state = {
  dialogs: [
    {
      id: 3,
      name: "Margot Robbie",
      avatar: '',
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
};

test('length of messages should be incremented after adding', () => {
  const action = dialogsActions.sendMessage(3, "New Message");

  const newState = dialogsReducer(state, action);
  
  const updatedDialog = newState.dialogs.find((d) => d.id === 3);

  expect(updatedDialog?.messages.length).toBe(3);
  expect(updatedDialog?.messages[2].text).toBe("New Message");
});