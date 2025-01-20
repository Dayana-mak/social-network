import s from './Post.module.css'

function Post(props) {
  return (
    <div className={s.item}>
      <p>{ props.text }</p>
      <span>{props.likesCount} likes</span>
    </div>
  );
}

export default Post