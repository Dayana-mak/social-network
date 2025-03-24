import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";
import { DialogType } from "../../../types/types";

const DialogItem: React.FC<DialogType> = ({ id, name }) => {
  return (
    <li className={s.dialog}>
      <NavLink to={`/dialogs/${id}`} className={s.dialog__link}>
        {name}
      </NavLink>
    </li>
  );
};

export default DialogItem;
