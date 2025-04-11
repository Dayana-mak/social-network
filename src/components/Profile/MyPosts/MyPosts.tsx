import React from "react";
import Post from "./Post/Post";
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import { PostType, ProfileType } from "../../../types/types";
import { Box } from "@mui/material";

type PropsType = {
  posts: Array<PostType>
  addPost: (newPostText: string) => void
  profile: ProfileType | null
}

const MyPosts: React.FC<PropsType> = ({posts, addPost, profile}) => {
  const postsList = posts.map((post) => (
    <Post key={post.id} text={post.text} likesCount={post.likesCount} profile={profile}/>
  ));

  const addNewPost = (values: AddPostFormValuesType) => {
    addPost(values.newPostText);
  };

  return (
    <Box>
        <AddPostForm onSubmit={addNewPost} />
      <Box mt={2}>{postsList}</Box>
    </Box>
  );
};

export default MyPosts;
