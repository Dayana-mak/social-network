import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import { InitialStateType } from "../../redux/dialogs-reducer";
import { List, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import Chat from "./Chat/Chat";

type PropsType = {
  dialogsPage: InitialStateType;
  sendMessage: (dialogId: number, text: string) => void;
};

const Dialogs: React.FC<PropsType> = ({ dialogsPage, sendMessage }) => {
  const { dialogId } = useParams<{ dialogId: string }>();
  const id = Number(dialogId);
  const dialog = dialogsPage.dialogs.find((d) => d.id === id)

  if (dialogId) {
    return <Chat dialog={dialog} sendMessage={sendMessage} />;
  }

  return (
    <Paper sx={{ height: "100%" }}>
      <List>
        {dialogsPage.dialogs.map((d) => (
          <DialogItem
            key={d.id}
            id={d.id}
            name={d.name}
            avatar={d.avatar}
            messages={d.messages}
          />
        ))}
      </List>
    </Paper>
  );
};

export default Dialogs;
