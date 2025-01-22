import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css"

function DialogItem(props) {
  return (
    <li className={s.dialog}><NavLink to={`/dialogs/${props.id}`} className={s.dialog__link}>{props.name}</NavLink></li>
  );
}

export default DialogItem;