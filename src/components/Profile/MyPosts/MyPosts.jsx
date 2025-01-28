import React from 'react';
import Post from './Post/Post';

function MyPosts(props) {
  const posts = props.posts;
  const postsList = posts.map(post => <Post text={post.text} likesCount={post.likesCount}/>)

  const newPostElement = React.createRef();

  const onAddPost = () => {
    props.addPost();
  }

  const onUpdateNewPostText = () => {
    const text = newPostElement.current.value;
    props.updateNewPostText(text);
  }

  return (
    <div>
      <h2>My Posts</h2>
      <div>
      <textarea onChange={onUpdateNewPostText} value={props.newPostText} ref={newPostElement} type="text" placeholder="Новый пост" />
      <button onClick={onAddPost}>Addpost</button>
      </div>
      <ul>
        { postsList }
      </ul>
    </div>
  );
}

export default MyPosts