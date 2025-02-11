import React from 'react';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component="textarea"
             name="newPostText"
             placeholder="New post" />
      <button>Addpost</button>
    </form>
  )
}

const AddPostReduxForm = reduxForm({form: "profileAddPostForm"}) (AddPostForm)

const MyPosts = (props) => {
  const posts = props.posts;
  const postsList = posts.map(post => <Post text={post.text} likesCount={post.likesCount}/>)

  const addNewPost = (values) => {
    props.addPost(values.newPostText);
  }

  return (
    <div>
      <h2>My Posts</h2>
      <AddPostReduxForm onSubmit={addNewPost}/>
      <ul>
        { postsList }
      </ul>
    </div>
  );
}

export default MyPosts