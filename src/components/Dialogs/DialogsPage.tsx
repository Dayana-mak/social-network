import React, { useEffect } from "react";
import DialogItem from "./DialogItem/DialogItem";
import { List, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "./Chat/Chat";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { getIsAuth } from "../../redux/selectors/auth-selectors";


const DialogsPage: React.FC = () => {
  const navigate = useNavigate();
  const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage);
  const isAuth = useSelector(getIsAuth); 

  const { dialogId } = useParams<{ dialogId: string }>();
  const id = Number(dialogId);
  const dialog = dialogsPage.dialogs.find((d) => d.id === id)

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);
  
  if (dialogId) {
    return <Chat dialog={dialog} dialogId={id}/>;
  }

  return (
    <Paper sx={{ height: "100%" }}>
      <List>
        {dialogsPage.dialogs.map((d) => (
          <DialogItem
            key={d.id}
            id={d.id}
            name={d.name}
            avatar={d.avatar}
            messages={d.messages}
          />
        ))}
      </List>
    </Paper>
  );
};

export default DialogsPage;
