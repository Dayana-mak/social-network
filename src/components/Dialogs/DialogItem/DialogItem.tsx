import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css"
import { DialogType } from "../../../types/types";
import { JSX } from "react";

type DialogItemPropsType = DialogType

const DialogItem = (props: DialogItemPropsType): JSX.Element => {
  return (
    <li className={s.dialog}><NavLink to={`/dialogs/${props.id}`} className={s.dialog__link}>{props.name}</NavLink></li>
  );
}

export default DialogItem;