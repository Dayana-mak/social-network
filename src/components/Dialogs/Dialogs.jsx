import React from "react";
import s from "./Dialogs.module.css"
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";

function Dialogs(props) {
  const dialogs = props.state.dialogs;
  const messages = props.state.messages;

  const dialogsList = dialogs.map(dialog => <DialogItem id={dialog.id} name={dialog.name}/>)
  const messagesList = messages.map(message => <MessageItem text={message.text}/>)

  const newMessageElement = React.createRef();

  const sendMessageButton = ()=> {
    const message = newMessageElement.current.value;
    alert(message)
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
          <textarea ref={newMessageElement} name="message" placeholder="Add message"></textarea>
          <button onClick={sendMessageButton}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default Dialogs;