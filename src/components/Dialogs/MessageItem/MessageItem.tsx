import { Avatar, Box, Typography } from "@mui/material";
import defaultAvatar from "../../../assets/images/default-avatar.svg";

type PropsType = {
  text: string;
  fromMe: boolean;
  avatar: string;
  senderName: string;
}

const MessageItem: React.FC<PropsType> = ({ text, fromMe, avatar, senderName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: fromMe ? "flex-end" : "flex-start",
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: fromMe ? "row-reverse" : "row",
          maxWidth: "75%",
        }}
      >
        <Avatar
          src={avatar || defaultAvatar}
          alt="avatar"
          sx={{
            width: 36,
            height: 36,
            mx: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: fromMe ? "flex-end" : "flex-start",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "text.primary",
              mb: 0.5,
            }}
          >
            {senderName}
          </Typography>
          <Box
            sx={{
              bgcolor: fromMe ? "primary.main" : "grey.200",
              color: fromMe ? "primary.contrastText" : "text.primary",
              px: 2,
              py: 1,
              borderRadius: 2,
              borderTopLeftRadius: fromMe ? 8 : 0,
              borderTopRightRadius: fromMe ? 0 : 8,
              wordBreak: "break-word",
            }}
          >
            <Typography>{text}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


export default MessageItem;
