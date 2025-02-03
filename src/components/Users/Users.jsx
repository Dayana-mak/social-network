import styles from "./users.module.css"
import defaultPhoto from "../../assets/images/defaultPhoto.webp"

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
            <span className={`${props.currentPage === pageNum && styles.selectedPage} ${styles.pageNum}`}
            onClick={() => props.onPageChange(pageNum)}>{pageNum} </span>
          ))}
        </div>
        {
          props.users.map(user => <div key={user.id}>
                <span>
                  <div>
                    <img src={user.photos.small !== null ? user.photos.small : defaultPhoto} alt="аватар" className={styles.userPhoto}/>
                  </div>
                  <div>
                    {user.followed 
                      ? <button onClick={() => props.unfollow(user.id)}>Unfollow</button>
                      : <button onClick={() => props.follow(user.id)}>Follow</button> 
                      }
                  </div>
                </span>
                <span>
                  <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                  </span>
                  <span>
                    <div>{"user.location.city"}</div>
                    <div>{"user.location.country"}</div>
                  </span>
                </span>
              </div>)
        }
      </div>
    )
}

export default Users;