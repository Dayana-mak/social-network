import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { ProfileType } from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../common/Preloader";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUserStatus } from "../../redux/selectors/profile-selectors";
import { AppDispatchType } from "../../redux/redux-store";
import { updateUserStatus } from "../../redux/profile-reducer";

type PropsType = {
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => void;
  isOwner: boolean;
};

const Profile: React.FC<PropsType> = (props) => {
  const profile = useSelector(getUserProfile);
  const status = useSelector(getUserStatus);

  const dispatch: AppDispatchType = useDispatch();

  const updateUserStatusF = (status: string) => {
    dispatch(updateUserStatus(status));
  }

  if (!profile) {
    return <Preloader />;
  }

  return (
    <Box>
      <ProfileHeader
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatusF}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
      />

          <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 6}}>
              <ProfileInfo
                profile={profile}
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
