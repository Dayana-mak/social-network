import React from "react";
import s from "./Dialogs.module.css"
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/state";

function Dialogs(props) {
  const dialogs = props.dialogsPage.dialogs;
  const messages = props.dialogsPage.messages;

  const dialogsList = dialogs.map(dialog => <DialogItem id={dialog.id} name={dialog.name}/>)
  const messagesList = messages.map(message => <MessageItem text={message.text}/>)

  const newMessageElement = React.createRef();

  const sendMessageButton = ()=> {
    props.dispatch(sendMessageActionCreator())
  }

  const updateNewMessageText = () => {
    const text = newMessageElement.current.value;
    props.dispatch(updateNewMessageTextActionCreator(text))
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
        <div>
          <textarea onChange={updateNewMessageText} value={props.dialogsPage.newMessageText} ref={newMessageElement} name="message" placeholder="Add message"></textarea>
          <button onClick={sendMessageButton}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default Dialogs;