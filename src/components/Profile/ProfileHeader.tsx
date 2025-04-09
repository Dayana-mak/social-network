import ProfileStatus from "./ProfileInfo/ProfileStatus";
import defaultAvatar from "../../assets/images/default-avatar.svg"
import { ChangeEvent } from "react";
import { ProfileType } from "../../types/types";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

type PropsType = {
  profile: ProfileType;
  status: string;
  updateUserStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  isOwner: boolean;
};
const ProfileHeader: React.FC<PropsType> = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  savePhoto,
}) => {
  const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
      <Paper sx={{ position: "relative", p: 2, width: "100%", mb: 2 }}>
        <Box
          sx={{
            position: "relative",
            bgcolor: "primary.main",
            height: { xs: 140, sm: 160, md: 200 },
            borderRadius: 1,
            mb: "4rem",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: -54,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: 80, sm: 96, md: 108 },
                height: { xs: 80, sm: 96, md: 108 },
              }}
            >
              <Avatar
                src={profile.photos.large || defaultAvatar}
                alt="Profile avatar"
                sx={{
                  width: 108,
                  height: 108,
                  border: "4px solid white",
                  boxShadow:
                    "rgba(29, 33, 38, 0.1) 0px 1px 2px 0px, rgba(29, 33, 38, 0.03) 0px 5px 20px 0px",
                  bgcolor: "white",
                }}
              />
              {isOwner && (
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 5,
                    bgcolor: "white",
                    borderRadius: "50%",
                    p: 0.5,
                    boxShadow: 1,
                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  <AddAPhotoIcon fontSize="small" color="primary" />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={onPhotoChange}
                  />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
            {profile.fullName}
          </Typography>
          <ProfileStatus
            status={status}
            updateUserStatus={updateUserStatus}
            isOwner={isOwner}
          />
        </Box>
      </Paper>
  );
};

export default ProfileHeader;
