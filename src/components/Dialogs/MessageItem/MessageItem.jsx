import s from "./../Dialogs.module.css"

function MessageItem(props) {
  return (
    <li className={s.message}>{props.text}</li>
  );
}

export default MessageItem;
