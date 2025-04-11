import React from "react";
import Post from "./Post/Post";
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import { PostType } from "../../../types/types";
import { Paper } from "@mui/material";

type PropsType = {
  posts: Array<PostType>
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = ({posts, addPost}) => {
  const postsList = posts.map((post) => (
    <Post key={post.id} text={post.text} likesCount={post.likesCount} />
  ));

  const addNewPost = (values: AddPostFormValuesType) => {
    addPost(values.newPostText);
  };

  return (
    <div>
        <AddPostForm onSubmit={addNewPost} />
      <ul>{postsList}</ul>
    </div>
  );
};

export default MyPosts;
