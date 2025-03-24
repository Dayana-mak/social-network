import { ProfileType } from "../../../types/types";
import s from "./ProfileInfo.module.css";

type PropsType = {
  profile: ProfileType;
  isOwner: boolean;
  activateEditMode: () => void;
};
const ProfileData: React.FC<PropsType> = ({
  profile,
  activateEditMode,
  isOwner,
}) => {
  return (
    <div>
      <h3>Name: {profile.fullName}</h3>
      <p>
        <span className={s.propertyTitle}>About me:</span> {profile.aboutMe}
      </p>
      <p>
        <span className={s.propertyTitle}>Looking for a job:</span>{" "}
        {profile.lookingForAJob ? "yes" : "no"}
      </p>
      <p>
        <span className={s.propertyTitle}>My professional skills:</span>{" "}
        {profile.lookingForAJobDescription}
      </p>
      <p className={s.propertyTitle}>Contacts:</p>
      <ul>
        {(
          Object.keys(profile.contacts) as Array<keyof ProfileType["contacts"]>
        ).map((key) => {
          const contactValue = profile.contacts[key];
          if (contactValue) {
            return (
              <Contact
                key={key}
                contactTitle={key}
                contactValue={contactValue}
              />
            );
          }
        })}
      </ul>
      {isOwner && <button onClick={activateEditMode}>Edit profile</button>}
    </div>
  );
};

type ContactPropsType = {
  contactTitle: string;
  contactValue: string;
};

const Contact: React.FC<ContactPropsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <li>
      <span className={s.propertyTitle}>{contactTitle}: </span>
      <a target="_blank" href={contactValue}>
        {contactValue}
      </a>
    </li>
  );
};

export default ProfileData;
