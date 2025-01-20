import s from './Post.module.css'

function Post(props) {
  return (
    <li className={s.item}>
      <p>{ props.text }</p>
      <span>{props.likesCount} likes</span>
    </li>
  );
}

export default Post