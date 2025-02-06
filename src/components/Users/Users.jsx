import styles from "./users.module.css"
import defaultPhoto from "../../assets/images/defaultPhoto.webp"
import { NavLink } from "react-router-dom";

const Users = (props) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
  
    return (
      <div>
        <div>
          {pages.map(pageNum => (
            <span key={pageNum} className={`${props.currentPage === pageNum && styles.selectedPage} ${styles.pageNum}`}
            onClick={() => props.onPageChange(pageNum)}>{pageNum} </span>
          ))}
        </div>
        {
          props.users.map(user => <div key={user.id}>
                <div>
                  <div>
                    <NavLink to={`/profile/${user.id}`}>
                      <img src={user.photos.small !== null ? user.photos.small : defaultPhoto} alt="аватар" className={styles.userPhoto}/>
                    </NavLink>
                  </div>
                  <div>
                    {user.followed 
                      ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                          props.unfollow(user.id);
                      }}>Unfollow</button>
                      : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                          props.follow(user.id);
                      }}>Follow</button> 
                      }
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
              </div>)
        }
      </div>
    )
}

export default Users;