import React from "react";
import s from "./Dialogs.module.css"
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";

function Dialogs(props) {
  debugger;
  const state = props.dialogsPage;

  const dialogsList = state.dialogs.map(dialog => <DialogItem id={dialog.id} name={dialog.name}/>)
  const messagesList = state.messages.map(message => <MessageItem text={message.text}/>)

  const onSendMessage = () => {
    props.sendMessage()
  }

  const onUpdateNewMessageText = (e) => {
    const text = e.target.value;
    props.updateNewMessageText(text);
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
          <textarea onChange={onUpdateNewMessageText} 
                    value={state.newMessageText} 
                    name="message" 
                    placeholder="Write message">
          </textarea>
          <button onClick={onSendMessage}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default Dialogs;