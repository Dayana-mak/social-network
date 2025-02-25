import React from "react";
import s from "./Dialogs.module.css"
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";
import AddMessageForm from "./AddMessageForm/AddMessageForm"


const  Dialogs = (props) => {
  const state = props.dialogsPage;

  const dialogsList = state.dialogs.map(dialog => <DialogItem key={dialog.id} id={dialog.id} name={dialog.name}/>)
  const messagesList = state.messages.map(message => <MessageItem key={message.id} text={message.text}/>)

  const addNewMessage = (message) => {
    props.sendMessage(message);
  }

  return (
    <div className={s.dialogs}> 
      <ul className={s.dialogs__list}>
        { dialogsList }
      </ul>
      <div>
        <ul className={s.messages}>
          {messagesList}
        </ul>
        <AddMessageForm onSubmit={addNewMessage}/>
      </div>
    </div>
  );
}

export default Dialogs;