import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import defaultAvatar from "../../../../assets/images/default-avatar.svg";
import { ProfileType } from "../../../../types/types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

type PropsType = {
  text: string;
  likesCount: number;
  profile: ProfileType | null;
  onToggleLike: () => void;
  isLiked: boolean;
};

const Post: React.FC<PropsType> = ({
  text,
  likesCount,
  profile,
  onToggleLike,
  isLiked,
}) => {
  return (
    <Paper
      component="article"
      sx={{ p: 3, mb: 2, display: "flex", flexDirection: "column", gap: "1.5" }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Avatar
          src={profile?.photos.large || defaultAvatar}
          alt="Profile avatar"
          sx={{
            width: 40,
            height: 40,
            boxShadow:
              "rgba(29, 33, 38, 0.1) 0px 1px 2px 0px, rgba(29, 33, 38, 0.03) 0px 5px 20px 0px",
            bgcolor: "secondary.main",
          }}
        />
        <Typography variant="subtitle2" fontWeight={600}>
          {profile?.fullName}
        </Typography>
      </Box>
      <Typography variant="body1" mb={1}>
        {text}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        gap={0.5}
        bgcolor={"#f0f2f5"}
        sx={{ width: "fit-content", px: 1, py: "2px", borderRadius: 2 }}
      >
        <IconButton
          aria-label="Like post"
          size="small"
          sx={{
            color: "primary.main",
            mr: "6px",
            p: 0,
          }}
          onClick={onToggleLike}
        >
          {isLiked ? (
            <FavoriteIcon sx={{ fontSize: "24px" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: "24px" }} />
          )}
        </IconButton>
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ fontSize: "14px" }}
        >
          {likesCount}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Post;
