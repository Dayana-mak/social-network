import Post from './Post/Post';

function MyPosts(props) {
  const posts = props.posts;

  const postsList = posts.map(post => <Post text={post.text} likesCount={post.likesCount}/>)
  return (
    <div>
      <h2>My Posts</h2>
      <div>
      <textarea type="text" placeholder="Новый пост"></textarea>
      <button>Addpost</button>
      </div>
      <ul>
        { postsList }
      </ul>
    </div>
  );
}

export default MyPosts