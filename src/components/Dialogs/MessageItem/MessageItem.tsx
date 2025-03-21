import { JSX } from "react";
import { MessageType } from "../../../types/types";
import s from "./../Dialogs.module.css"

type MessageItemPropsType = MessageType

const MessageItem = (props: MessageItemPropsType): JSX.Element => {
  return (
    <li className={s.message}>{props.text}</li>
  );
}

export default MessageItem;
