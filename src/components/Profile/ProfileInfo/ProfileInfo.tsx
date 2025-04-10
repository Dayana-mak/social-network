import ProfileData from "./ProfileData";
import { useState } from "react";
import ProfileDataForm, { ProfileDataFormValuesType } from "./ProfileDataForm";
import { ProfileType } from "../../../types/types";
import { Paper, Typography } from "@mui/material";

type PropsType = {
  profile: ProfileType;
  saveProfile: (profile: ProfileType) => void;
  isOwner: boolean;
};
const ProfileInfo: React.FC<PropsType> = ({
  profile,
  isOwner,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onSubmit = (values: ProfileDataFormValuesType) => {
    const updatedProfile: ProfileType = {
      ...profile,
      fullName: values.fullName,
      aboutMe: values.aboutMe,
      lookingForAJob: values.lookingForAJob,
      lookingForAJobDescription: values.lookingForAJobDescription,
      contacts: values.contacts as ProfileType["contacts"],
    };
    saveProfile(updatedProfile);
    setEditMode(false);
  };

  return (
    <Paper sx={{ position: "relative", p: 2, width: "100%", height: "100%" }}>
      {editMode ? (
        <ProfileDataForm profile={profile} onSubmit={onSubmit} />
      ) : (
        <ProfileData
          profile={profile}
          activateEditMode={activateEditMode}
          isOwner={isOwner}
        />
      )}
    </Paper>
  );
};

export default ProfileInfo;
