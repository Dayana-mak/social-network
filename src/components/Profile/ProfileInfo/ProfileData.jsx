import s from "./ProfileInfo.module.css";

const ProfileData = ({profile, activateEditMode, isOwner}) => {
  return (
    <div>
      <h3>Name: {profile.fullName}</h3>
      <p><span className={s.propertyTitle}>About me:</span> {profile.aboutMe}</p>
      <p><span className={s.propertyTitle}>Looking for a job:</span> {profile.lookingForAJob ? "yes" : "no"}</p>
      <p><span className={s.propertyTitle}>My professional skills:</span> {profile.lookingForAJobDescription}</p>
      <p className={s.propertyTitle}>Contacts:</p>
      <ul>
        {Object.keys(profile.contacts).map(key => {
          if (profile.contacts[key]) {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
          }
        })}
      </ul>
      {isOwner && <button onClick={activateEditMode}>Edit profile</button>}
    </div>
  )
}

const Contact = ({contactTitle, contactValue}) => {
  const linkHref = `https://${contactValue}`
  return <li><span className={s.propertyTitle}>{contactTitle}: </span><a target="_blank" href={contactValue}>{contactValue}</a></li>
}


export default ProfileData;