import Preloader from "../../common/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import defaultPhoto from "../../../assets/images/defaultPhoto.jpeg";
import ProfileData from "./ProfileData";
import { ChangeEvent, useState } from "react";
import ProfileDataForm, { ProfileDataFormValuesType } from "./ProfileDataForm";
import { ProfileType } from "../../../types/types";

type PropsType = {
  profile: ProfileType;
  status: string;
  updateUserStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => void;
  isOwner: boolean;
};
const ProfileInfo: React.FC<PropsType> = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (values: ProfileDataFormValuesType) => {
    const updatedProfile: ProfileType = {
      ...profile,
      fullName: values.fullName,
      aboutMe: values.aboutMe,
      lookingForAJob: values.lookingForAJob,
      lookingForAJobDescription: values.lookingForAJobDescription,
      contacts: values.contacts as ProfileType["contacts"],
    }
    saveProfile(updatedProfile);
    setEditMode(false);
  };

  return (
    <div className={s.profile__wrapper}>
      <div>
        <img
          className={s.image}
          src={profile.photos.large || defaultPhoto}
          alt="Profile avatar"
        />
        {isOwner && (
          <div>
            <input type={"file"} onChange={onPhotoChange} />
          </div>
        )}
        <ProfileStatus status={status} updateUserStatus={updateUserStatus} isOwner={isOwner}/>
      </div>
      <div className={s.descriprion}>
        {editMode ? (
          <ProfileDataForm profile={profile} onSubmit={onSubmit} />
        ) : (
          <ProfileData
            profile={profile}
            activateEditMode={activateEditMode}
            isOwner={isOwner}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
