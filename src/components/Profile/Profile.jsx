import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props) {
  return (
    <div>
      <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
      <MyPostsContainer />
    </div>
  );
}

export default Profile;