import styles from "./users.module.css"

const Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {id: 1, photoUrl: "https://trendreporter.ru/wp-content/uploads/2024/04/paroda-sobaki-moltipu-2.webp.webp", isFollowed: false, fullName:"Roberto", status: "I'm a boss", location: {city: "Rome", country: "Italy"}},
      {id: 2, photoUrl: "https://trendreporter.ru/wp-content/uploads/2024/04/paroda-sobaki-moltipu-2.webp.webp", isFollowed: false, fullName:"Andrew", status: "I'm a boss too", location: {city: "Paris", country: "France"}},
      {id: 3, photoUrl: "https://trendreporter.ru/wp-content/uploads/2024/04/paroda-sobaki-moltipu-2.webp.webp", isFollowed: true, fullName:"Jovanni", status: "I'm a boss also", location: {city: "Berlin", country: "Germany"}},
      {id: 4, photoUrl: "https://trendreporter.ru/wp-content/uploads/2024/04/paroda-sobaki-moltipu-2.webp.webp", isFollowed: true, fullName:"Alexandro", status: "I'm a big boss", location: {city: "Berlin", country: "Germany"}}
    ])
  }
  
  return (
    <div>
      {
        props.users.map(user => <div key={user.id}>
              <span>
                <div>
                  <img src={user.photoUrl} alt="аватар" className={styles.userPhoto}/>
                </div>
                <div>
                  {user.isFollowed 
                    ? <button onClick={() => props.unfollow(user.id)}>Unfollow</button>
                    : <button onClick={() => props.follow(user.id)}>Follow</button> 
                    }
                </div>
              </span>
              <span>
                <span>
                  <div>{user.fullName}</div>
                  <div>{user.status}</div>
                </span>
                <span>
                  <div>{user.location.city}</div>
                  <div>{user.location.country}</div>
                </span>
              </span>
            </div>)
      }
    </div>
  )
}

export default Users;