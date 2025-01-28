import React from "react";
import s from "./Dialogs.module.css"
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";


function DialogsContainer(props) {
  const state = props.store.getState().dialogsPage;

  const sendMessage = ()=> {
    props.store.dispatch(sendMessageActionCreator())
  }

  const updateNewMessageText = (text) => {
    props.store.dispatch(updateNewMessageTextActionCreator(text))
  }
 
  return (
    <Dialogs updateNewMessageText={updateNewMessageText}
             sendMessage={sendMessage}
             dialogsPage={state}/>
  );
}

export default DialogsContainer;