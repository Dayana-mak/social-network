import s from "./Dialogs.module.css"
import { NavLink } from "react-router-dom";

function DialogItem(props) {
  return (
    <li className={s.dialog}><NavLink to={`/dialogs/${props.id}`} className={s.dialog__link}>{props.name}</NavLink></li>
  )
}

function Message(props) {
  return (
    <li className={s.message}>{props.text}</li>
  )
}

function Dialogs() {
  let dialogsData = [
    {id: 1, name: 'Alex'},
    {id: 2, name: 'Jack'},
    {id: 3, name: 'Roberto'},
  ]

  let messagesData = [
    {id: 1, text: "Hi"},
    {id: 2, text: "How are you?"},
    {id: 3, text: "Where are you"},
  ]

  let messagesList = messagesData.map(message => <Message text={message.text}/>)

  return (
    <div className={s.dialogs}> 
      <ul className={s.dialogs__list}>
        {dialogsData.map(dialog => <DialogItem id={dialog.id} name={dialog.name}/>)}
      </ul>
      <ul className={s.messages}>
        {messagesList}
      </ul>
    </div>
  );
}

export default Dialogs;