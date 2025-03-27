import styles from "./users.module.css";
import defaultAvatar from "../../assets/images/default-avatar.svg";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";

type UserPropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};
const User: React.FC<UserPropsType> = ({
  user,
  followingInProgress,
  unfollow,
  follow,
}) => {
  return (
    <div>
      <div>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img
              src={
                user.photos.small !== null ? user.photos.small : defaultAvatar
              }
              alt="аватар"
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div>
        <div>
          <p>{user.name}</p>
          <p>{user.status}</p>
        </div>
        <div>
          <div>{"user.location.city"}</div>
          <div>{"user.location.country"}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
