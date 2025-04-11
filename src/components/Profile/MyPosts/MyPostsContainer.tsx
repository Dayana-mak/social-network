import { profileActions } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import { PostType, ProfileType } from "../../../types/types";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

type MapStatePropsType = {
  posts: Array<PostType>,
  profile: ProfileType | null
};

type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
};

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    profile: state.profilePage.profile
  };
};

const MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, { addPost: profileActions.addPost })(MyPosts);

export default MyPostsContainer;
