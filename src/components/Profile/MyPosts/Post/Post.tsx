import s from './Post.module.css'

type PropsType = {
  text: string
  likesCount: number
}

const Post: React.FC<PropsType> = ({text, likesCount}) => {
  return (
    <li className={s.item}>
      <p>{ text }</p>
      <span>{likesCount} likes</span>
    </li>
  );
}

export default Post