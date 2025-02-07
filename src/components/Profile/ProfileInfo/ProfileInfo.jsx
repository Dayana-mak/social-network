import Preloader from "../../common/Preloader";
import s from "./ProfileInfo.module.css"
import ProfileStatus from "./ProfileStatus";

function ProfileInfo(props) {
  if (!props.profile) {
    return < Preloader/>
  }
  return (
    <div className={s.profile__wrapper}>
      <img className={s.image}src={props.profile.photos.large || "https://i.pinimg.com/736x/f0/c6/7c/f0c67c6d8ee566c1d463291449b7a768.jpg"} alt="Profile avatar" />
      <div className={s.descriprion}>
        <h3>{props.profile.fullName}</h3>
        <p>{props.profile.aboutMe}</p>
        <ProfileStatus status={"Hello, everybody!!"}/>
      </div>
    </div>
  );
}

export default ProfileInfo;