import s from "./Dialogs.module.css"
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";

function Dialogs(props) {
  let dialogs = props.state.dialogs;
  let messages = props.state.messages;

  let dialogsList = dialogs.map(dialog => <DialogItem id={dialog.id} name={dialog.name}/>)
  let messagesList = messages.map(message => <MessageItem text={message.text}/>)

  return (
    <div className={s.dialogs}> 
      <ul className={s.dialogs__list}>
        { dialogsList }
      </ul>
      <ul className={s.messages}>
        {messagesList}
      </ul>
    </div>
  );
}

export default Dialogs;