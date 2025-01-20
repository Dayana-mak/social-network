import s from "./ProfileInfo.module.css"

function ProfileInfo() {
  return (
    <div className={s.profile__wrapper}>
      <img className={s.image}src="https://i.pinimg.com/736x/f0/c6/7c/f0c67c6d8ee566c1d463291449b7a768.jpg" alt="Profile avatar" />
      <div className={s.descriprion}>
        <h3>Roberto Jovanni</h3>
        <p>I'm the best!</p>
      </div>
    </div>
  );
}

export default ProfileInfo;