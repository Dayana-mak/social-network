import { profileActions } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import { PostType, ProfileType } from "../../../types/types";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

type OwnPropsType = {
  isOwner: boolean;
};

type MapStatePropsType = {
  posts: Array<PostType>;
  profile: ProfileType | null;
};

type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
  toggleLike: (postId: number) => void;
};

const mapStateToProps = (state: AppStateType, ownProps: OwnPropsType) => {
  return {
    posts: state.profilePage.posts,
    profile: state.profilePage.profile,
    isOwner: ownProps.isOwner,
  };
};

const MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, {
  addPost: profileActions.addPost,
  toggleLike: profileActions.toggleLike,
})(MyPosts);

export default MyPostsContainer;
