import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ProfileType } from "../../types/types";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../common/Preloader";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfileSelector,
  getUserStatusSelector,
} from "../../redux/selectors/profile-selectors";
import { getUserProfile, getUserStatus, savePhoto, saveProfile } from "../../redux/profile-reducer";
import { AppDispatchType } from "../../redux/redux-store";
import { updateUserStatus } from "../../redux/profile-reducer";
import { getAuthUserId, getIsAuth } from "../../redux/selectors/auth-selectors";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import MyPosts from "./MyPosts/MyPosts";

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const profile = useSelector(getUserProfileSelector);
  const status = useSelector(getUserStatusSelector);
  const authorizedUserId = useSelector(getAuthUserId);
  const isAuth = useSelector(getIsAuth);
  const isOwner = !userId;

  const navigate = useNavigate();

  const dispatch: AppDispatchType = useDispatch();

  const updateUserStatusF = (status: string) => {
    dispatch(updateUserStatus(status));
  };

  const savePhotoF = (file: File) => {
    dispatch(savePhoto(file));
  }

  const saveProfileF = (profile: ProfileType) => {
    dispatch(saveProfile(profile));
  }

  useEffect(() => {
    let id = userId ? +userId : authorizedUserId;

    if (!id && !isAuth) {
      navigate("/login");
      return;
    }

    if (id !== null) {
      dispatch(getUserProfile(id!));
      dispatch(getUserStatus(id!))
    }
  }, [userId, authorizedUserId, isAuth, dispatch, navigate]);

  if (!profile) {
    return <Preloader />;
  }

  return (
    <Box>
      <ProfileHeader
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatusF}
        isOwner={isOwner}
        savePhoto={savePhotoF}
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ProfileInfo
            profile={profile}
            saveProfile={saveProfileF}
            isOwner={isOwner}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MyPosts isOwner={isOwner} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
