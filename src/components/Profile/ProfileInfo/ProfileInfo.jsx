import Preloader from "../../common/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import defaultPhoto from "../../../assets/images/defaultPhoto.webp";

function ProfileInfo({
  profile,
  status,
  updateUserStatus,
  isOwner,
  savePhoto,
}) {
  if (!profile) {
    return <Preloader />;
  }

  const onPhotoChange = (e) => {
    if (e.target.files.length > 0) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <div className={s.profile__wrapper}>
      <img
        className={s.image}
        src={profile.photos.large || defaultPhoto}
        alt="Profile avatar"
      />
      <div className={s.descriprion}>
        <h3>{profile.fullName}</h3>
        <p>{profile.aboutMe}</p>
        <ProfileStatus status={status} updateUserStatus={updateUserStatus} />
        {isOwner && <input type={"file"} onChange={onPhotoChange} />}
      </div>
    </div>
  );
}

export default ProfileInfo;
