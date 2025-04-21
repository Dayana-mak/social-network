import {
  Box,
  Button,
  Divider,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { ProfileType } from "../../../types/types";
import EditIcon from "@mui/icons-material/Edit";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

import GitHubIcon from "@mui/icons-material/GitHub";
import PublicIcon from "@mui/icons-material/Public";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

type PropsType = {
  profile: ProfileType;
  isOwner: boolean;
  activateEditMode: () => void;
};

const contactDisplayNames: { [key in keyof ProfileType["contacts"]]: string } =
  {
    github: "GitHub",
    vk: "VK",
    facebook: "Facebook",
    instagram: "Instagram",
    twitter: "Twitter",
    website: "Website",
    youtube: "YouTube",
    mainLink: "Telegram",
  };

const ProfileData: React.FC<PropsType> = ({
  profile,
  activateEditMode,
  isOwner,
}) => {
  return (
    <Box>
      <Box sx={{ display: "flex", mb: 2, gap: 1, alignItems: "center" }}>
        <Typography variant="h6">Profile info</Typography>
        {isOwner && (
          <Button
            variant="text"
            startIcon={<EditIcon />}
            onClick={activateEditMode}
            sx={{ textTransform: "none" }}
          >
            Edit
          </Button>
        )}
      </Box>
      <Box display="flex" alignItems="center" mb={1}>
        <PersonOutlineOutlinedIcon
          fontSize="small"
          sx={{ mr: 1, color: "text.disabled" }}
        />
        <Typography component="h3" sx={{ color: "text.disabled", mr: 1 }}>
          Name:
        </Typography>
        <Typography>{profile.fullName}</Typography>
      </Box>
      <Box display="flex" alignItems="center" mb={1}>
        <WorkOutlineOutlinedIcon
          fontSize="small"
          sx={{ mr: 1, color: "text.disabled" }}
        />
        <Typography component="h3" sx={{ color: "text.disabled", mr: 1 }}>
          Looking for a job:
        </Typography>
        <Typography>{profile.lookingForAJob ? "yes" : "no"}</Typography>
      </Box>
      <Box display="flex" flexDirection={"column"} mb={1}>
        <Box display="flex" alignItems={"center"}>
          <InfoOutlinedIcon
            fontSize="small"
            sx={{ mr: 1, color: "text.disabled" }}
          />
          <Typography component="h3" sx={{ color: "text.disabled", mr: 1 }}>
            About me:
          </Typography>
        </Box>
        <Typography sx={{ ml: "28px" }}>{profile.aboutMe}</Typography>
      </Box>
      <Box display="flex" flexDirection={"column"} mb={1}>
        <Box display="flex" alignItems={"center"}>
          <CodeOutlinedIcon
            fontSize="small"
            sx={{ mr: 1, color: "text.disabled" }}
          />
          <Typography component="h3" sx={{ color: "text.disabled", mr: 1 }}>
            My professional skills:
          </Typography>
        </Box>
        <Typography sx={{ ml: "28px" }}>
          {profile.lookingForAJobDescription}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />
      <Box display="flex" alignItems="center" mb={1}>
        <LocalPhoneOutlinedIcon
          fontSize="small"
          sx={{ mr: 1, color: "text.disabled" }}
        />
        <Typography component="h3" sx={{ color: "text.disabled", mr: 1 }}>
          Contacts:
        </Typography>
      </Box>
      <List dense disablePadding>
        {(
          Object.keys(profile.contacts) as Array<keyof ProfileType["contacts"]>
        ).map((key) => {
          const contactValue = profile.contacts[key];
          if (contactValue) {
            return (
              <ListItem
                key={key}
                sx={{ py: 0.5, display: "flex", alignItems: "center" }}
              >
                {getContactIcon(key)}
                <Typography
                  sx={{ fontWeight: 500, mr: 1, color: "text.disabled" }}
                >
                  {contactDisplayNames[key] || key}:
                </Typography>
                <Link
                  href={contactValue}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  sx={{ color: "text.primary" }}
                >
                  {contactValue}
                </Link>
              </ListItem>
            );
          }
          return null;
        })}
      </List>
    </Box>
  );
};

export const getContactIcon = (key: string) => {
  switch (key.toLowerCase()) {
    case "github":
      return (
        <GitHubIcon fontSize="small" sx={{ mr: 1, color: "text.disabled" }} />
      );
    case "facebook":
      return (
        <FacebookOutlinedIcon
          fontSize="small"
          sx={{ mr: 1, color: "text.disabled" }}
        />
      );
    case "instagram":
      return (
        <CameraAltOutlinedIcon
          fontSize="small"
          sx={{ mr: 1, color: "text.disabled" }}
        />
      );
    case "website":
      return (
        <LanguageOutlinedIcon
          fontSize="small"
          sx={{ mr: 1, color: "text.disabled" }}
        />
      );
    case "youtube":
      return (
        <SmartDisplayOutlinedIcon
          fontSize="small"
          sx={{ mr: 1, color: "text.disabled" }}
        />
      );
    case "mainlink":
      return (
        <SendOutlinedIcon
          fontSize="small"
          sx={{ mr: 1, color: "text.disabled" }}
        />
      );
    default:
      return (
        <PublicIcon fontSize="small" sx={{ mr: 1, color: "text.disabled" }} />
      );
  }
};

export default ProfileData;
