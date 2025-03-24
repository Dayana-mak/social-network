import { profileActions } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import { PostType } from "../../../types/types";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

type MapStatePropsType = {
  posts: Array<PostType>;
};

type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
};

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, { addPost: profileActions.addPost })(MyPosts);

export default MyPostsContainer;
