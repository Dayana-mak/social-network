import defaultAvatar from "../../assets/images/default-avatar.svg";
import { Link as RouterLink} from "react-router-dom";
import { UserType } from "../../types/types";
import { Link, Avatar, Box, Button, Typography } from "@mui/material";

type UserPropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};
const User: React.FC<UserPropsType> = ({
  user,
  followingInProgress,
  unfollow,
  follow,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        py: "12px",
        borderBottom: "1px solid #dce1e6",
      }}
    >
      <Link
        component={RouterLink}
        to={`/profile/${user.id}`}
        underline="none"
        sx={{ display: "inline-block" }}
      >
        <Avatar
          src={user.photos.small || defaultAvatar}
          alt="Profile avatar"
          sx={{
            width: 72,
            height: 72,
            border: "2px solid #617BFF",
            boxShadow:
              "rgba(29, 33, 38, 0.1) 0px 1px 2px 0px, rgba(29, 33, 38, 0.03) 0px 5px 20px 0px",
            bgcolor: "white",
          }}
        />
      </Link>
      <Box>
        <Link
          component={RouterLink}
          to={`/profile/${user.id}`}
          underline="none"
          color="inherit"
        >
          <Typography fontWeight={600}>{user.name}</Typography>
        </Link>
        <Typography>{user.status || ""}</Typography>
      </Box>
      <Box sx={{ alignSelf: "right", ml: "auto" }}>
        <Button
          disabled={followingInProgress.some((id) => id === user.id)}
          onClick={() => {
            user.followed ? unfollow(user.id) : follow(user.id);
          }}
          variant={user.followed ? "outlined" : "contained"}
          color="primary"
          sx={{
            borderRadius: "8px",
            px: 3,
            py: 1.2,
            fontSize: "0.95rem",
            fontWeight: 500,
            minWidth: 120,
            transition: "all 0.2s ease",
            textTransform: "none",
            ...(user.followed
              ? {
                  color: "#617BFF",
                  borderColor: "#617BFF",
                  "&:hover": {
                    borderColor: "#4f65d4",
                    backgroundColor: "rgba(97, 123, 255, 0.04)",
                  },
                }
              : {
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    boxShadow: "none",
                  },
                }),
          }}
        >
          {user.followed ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Box>
  );
};

export default User;
