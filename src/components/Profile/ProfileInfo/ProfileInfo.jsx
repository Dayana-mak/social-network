import Preloader from "../../common/Preloader";
import s from "./ProfileInfo.module.css"

function ProfileInfo(props) {
  if (!props.profile) {
    return < Preloader/>
  }
  return (
    <div className={s.profile__wrapper}>
      <img className={s.image}src={props.profile.photos.large} alt="Profile avatar" />
      <div className={s.descriprion}>
        <h3>{props.profile.fullName}</h3>
        <p>{props.profile.aboutMe}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;