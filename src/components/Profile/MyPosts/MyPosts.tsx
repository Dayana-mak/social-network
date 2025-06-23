import React from "react";
import Post from "./Post/Post";
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsSelector,
  getUserProfileSelector,
} from "../../../redux/selectors/profile-selectors";
import { profileActions } from "../../../redux/profile-reducer";

type PropsType = {
  isOwner: boolean;
};

const MyPosts: React.FC<PropsType> = ({ isOwner }) => {
  const dispatch = useDispatch();
  const posts = useSelector(getPostsSelector);
  const profile = useSelector(getUserProfileSelector);

  const addNewPost = (values: AddPostFormValuesType) => {
    dispatch(profileActions.addPost(values.newPostText));
  };

  const toggleLikeHandler = (postId: number) => {
    dispatch(profileActions.toggleLike(postId));
  };

  const postsList = posts
    .slice()
    .reverse()
    .map((post) => (
      <Post
        key={post.id}
        text={post.text}
        likesCount={post.likesCount}
        isLiked={post.isLiked}
        profile={profile}
        onToggleLike={() => toggleLikeHandler(post.id)}
      />
    ));

  return (
    <Box>
      {isOwner && <AddPostForm onSubmit={addNewPost} />}
      <Box mt={2}>{postsList}</Box>
    </Box>
  );
};

export default MyPosts;
