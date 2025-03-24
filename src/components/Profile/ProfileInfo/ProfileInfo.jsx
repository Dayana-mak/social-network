import Preloader from "../../common/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import defaultPhoto from "../../../assets/images/defaultPhoto.jpeg";
import ProfileData from "./ProfileData";
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  status,
  updateUserStatus,
  isOwner,
  savePhoto,
  saveProfile
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onPhotoChange = (e) => {
    if (e.target.files.length > 0) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (profile) => {
    saveProfile(profile);
    setEditMode(false);
  }

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
        <ProfileStatus status={status} updateUserStatus={updateUserStatus} />
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
