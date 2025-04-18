import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { ProfileType } from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../common/Preloader";

type PropsType = {
  profile: ProfileType;
  status: string;
  updateUserStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => void;
  isOwner: boolean;
};
const Profile: React.FC<PropsType> = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <Box>
      <ProfileHeader
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
      />

          <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 6}}>
              <ProfileInfo
                profile={props.profile}
                saveProfile={props.saveProfile}
                isOwner={props.isOwner}
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <MyPostsContainer isOwner={props.isOwner}/>
            </Grid>
          </Grid>
    </Box>
  );
};

export default Profile;
