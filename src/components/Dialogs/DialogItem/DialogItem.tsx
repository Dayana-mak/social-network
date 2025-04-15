import { Link as RouterLink } from "react-router-dom";
import { DialogType } from "../../../types/types";
import { Avatar, Box, Link, ListItem, Typography } from "@mui/material";
import defaultAvatar from "../../../assets/images/default-avatar.svg";

const DialogItem: React.FC<DialogType> = ({ id, name, avatar, messages }) => {
  const lastMessage = messages[messages.length - 1];

  const getFormattedDate = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();
  
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  
    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
  
    const optionsThisYear: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
  
    const optionsOtherYear: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
  
    const isCurrentYear = date.getFullYear() === now.getFullYear();
  
    return date.toLocaleDateString("en-US", isCurrentYear ? optionsThisYear : optionsOtherYear);
  };
  
  const formattedDate = lastMessage?.date ? getFormattedDate(lastMessage.date) : "";
  return (
    <ListItem
      sx={{
        px: 2,
        py: 1.5,
        borderBottom: "1px solid #eee",
      }}
    >
      <Link
        component={RouterLink}
        to={`/dialogs/${id}`}
        underline="none"
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Avatar
            src={avatar || defaultAvatar}
            alt="Profile avatar"
            sx={{
              width: 50,
              height: 50,
              mr: "14px",
            }}
          />
          <Box>
            <Typography sx={{ fontWeight: 600, color: "text.primary"}}>{name}</Typography>
            <Typography
              sx={{ fontSize: "0.9rem", color: "#626d7a" }}
              noWrap
              maxWidth={180}
            >
              {lastMessage?.text || "No messages yet"}
            </Typography>
          </Box>
          <Typography
            sx={{ fontSize: "0.8rem", color: "text.disabled", ml: "auto" }}
          >
            {formattedDate}
          </Typography>
        </Box>
      </Link>
    </ListItem>
  );
};

export default DialogItem;
