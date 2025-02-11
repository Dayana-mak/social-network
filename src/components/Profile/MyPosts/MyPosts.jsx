import React from 'react';
import Post from './Post/Post';
import AddPostForm from "./AddPostForm/AddPostForm"


const MyPosts = (props) => {
  const posts = props.posts;
  const postsList = posts.map(post => <Post text={post.text} likesCount={post.likesCount}/>)

  const addNewPost = (values) => {
    props.addPost(values.newPostText);
  }

  return (
    <div>
      <h2>My Posts</h2>
      <AddPostForm onSubmit={addNewPost}/>
      <ul>
        { postsList }
      </ul>
    </div>
  );
}

export default MyPosts