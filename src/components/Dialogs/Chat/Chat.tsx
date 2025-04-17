import { Avatar, Box, Paper, Typography } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useParams } from "react-router-dom";
import defaultAvatar from "../../../assets/images/default-avatar.svg";
import MessageItem from "../MessageItem/MessageItem";
import AddMessageForm from "../AddMessageForm/AddMessageForm";
import { DialogType } from "../../../types/types";

type PropsType = {
  dialog: DialogType | undefined;
  sendMessage: (dialogId: number, text: string) => void;
};

const Chat: React.FC<PropsType> = ({ sendMessage, dialog }) => {
  const { dialogId } = useParams<{ dialogId: string }>();
  const id = Number(dialogId);

  const handleSend = (dialogId: number, values: { newMessageText: string }) => {
    sendMessage(dialogId, values.newMessageText);
  };

  console.log("Current dialog messages:", dialog?.messages);

  if (!dialog) {
    return <Typography>Dialog not found</Typography>;
  }

  return (
    <Paper
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid #dce1e6",
        }}
      >
        <MuiLink
          component={RouterLink}
          to="/dialogs"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            fontSize: "0.95rem",
            color: "#818c99",
          }}
        >
           <ArrowBackIosNewIcon sx={{ fontSize: 16, mr: 0.5 }} />
           Back
        </MuiLink>
        <Typography fontWeight={600}>{dialog?.name}</Typography>
        <Avatar
          src={dialog?.avatar || defaultAvatar}
          alt="avatar"
          sx={{ width: 30, height: 30 }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {dialog.messages.map((message) => (
          <MessageItem
            key={message.id}
            text={message.text}
            fromMe={message.fromMe}
            avatar={message.fromMe ? defaultAvatar : dialog.avatar}
            senderName={message.fromMe ? "You" : dialog.name}
          />
        ))}
      </Box>
      <Box sx={{ borderTop: "1px solid #dce1e6", p: 2 }}>
        <AddMessageForm dialogId={id} onSubmit={handleSend} />
      </Box>
    </Paper>
  );
};

export default Chat;
