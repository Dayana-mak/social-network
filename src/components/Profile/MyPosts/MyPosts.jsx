import s from './MyPosts.module.css'
import Post from './Post/Post';

function MyPosts() {
  return (
    <div>
      <h2>My Posts</h2>
      <div>
      <textarea type="text" placeholder="Новый пост"></textarea>
      <button>Addpost</button>
      </div>
      <div>
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default MyPosts