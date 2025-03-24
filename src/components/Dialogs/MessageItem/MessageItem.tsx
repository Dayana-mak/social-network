import { JSX } from "react";
import { MessageType } from "../../../types/types";
import s from "./../Dialogs.module.css";

const MessageItem: React.FC<MessageType> = ({ id, text }) => {
  return <li className={s.message}>{text}</li>;
};

export default MessageItem;
