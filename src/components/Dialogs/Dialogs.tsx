import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import { InitialStateType } from "../../redux/dialogs-reducer";
import { List, Paper } from "@mui/material";


type PropsType = {
  dialogsPage: InitialStateType;
  sendMessage: (newMessageText: string) => void;
};

type ValuesType = {
  newMessageText: string;
};

const Dialogs: React.FC<PropsType> = ({dialogsPage, sendMessage}) => {
  const dialogsList = dialogsPage.dialogs.map((dialog) => (
    <DialogItem key={dialog.id} id={dialog.id} name={dialog.name} avatar={dialog.avatar} messages={dialog.messages}/>
  ));

  const addNewMessage = (values: ValuesType) => {
    sendMessage(values.newMessageText);
  };

  return (
    <Paper sx={{height: "100%"}}>
      <List>{dialogsList}</List>
    </Paper>
  );
};

export default Dialogs;
