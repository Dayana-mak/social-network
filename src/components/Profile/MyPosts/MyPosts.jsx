
import Post from './Post/Post';

function MyPosts() {
  let postData = [
    {id: 1, text:"Hey, why nobody love me?", likesCount: 10},
    {id: 2, text:"It's our new program! Hey!", likesCount: 20},
    {id: 3, text:"I'm tired", likesCount: 200}
  ]
  return (
    <div>
      <h2>My Posts</h2>
      <div>
      <textarea type="text" placeholder="Новый пост"></textarea>
      <button>Addpost</button>
      </div>
      <ul>
        { postData.map(post => <Post text={post.text} likesCount={post.likesCount}/>) }
      </ul>
    </div>
  );
}

export default MyPosts