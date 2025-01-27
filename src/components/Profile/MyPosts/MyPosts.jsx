import React from 'react';
import Post from './Post/Post';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';

function MyPosts(props) {
  const posts = props.posts;
  const postsList = posts.map(post => <Post text={post.text} likesCount={post.likesCount}/>)

  const newPostElement = React.createRef();

  const addPostButton = () => {
    props.dispatch(addPostActionCreator());
  }

  const updateNewPost = () => {
    const text = newPostElement.current.value;
    props.dispatch(updateNewPostTextActionCreator(text));
  }

  return (
    <div>
      <h2>My Posts</h2>
      <div>
      <textarea onChange={updateNewPost} value={props.newPostText} ref={newPostElement} type="text" placeholder="Новый пост" />
      <button onClick={ addPostButton }>Addpost</button>
      </div>
      <ul>
        { postsList }
      </ul>
    </div>
  );
}

export default MyPosts