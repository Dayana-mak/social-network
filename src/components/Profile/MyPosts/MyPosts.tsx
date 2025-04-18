import React from "react";
import Post from "./Post/Post";
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import { PostType, ProfileType } from "../../../types/types";
import { Box } from "@mui/material";

type PropsType = {
  posts: Array<PostType>;
  addPost: (newPostText: string) => void;
  toggleLike: (postId: number) => void;
  profile: ProfileType | null;
  isOwner: boolean;
};

const MyPosts: React.FC<PropsType> = ({ posts, addPost, profile, isOwner, toggleLike}) => {
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
        onToggleLike={() => toggleLike(post.id)}
      />
    ));

  const addNewPost = (values: AddPostFormValuesType) => {
    addPost(values.newPostText);
  };

  return (
    <Box>
      {isOwner && <AddPostForm onSubmit={addNewPost} />}
      <Box mt={2}>{postsList}</Box>
    </Box>
  );
};

export default MyPosts;
