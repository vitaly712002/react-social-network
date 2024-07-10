import style from './Post.module.css';

type PropsType = {
  img: string;
  message: string;
  idPost: number;
  onDeletePost: (id: number) => void;
};
const Post: React.FC<PropsType> = ({ img, message, idPost, onDeletePost }) => {
  return (
    <div className={style.item}>
      <div className={style.item_content}>
        {img ? <img src={img} alt="" /> : ''}
        {message}
      </div>

      <div className={style.btn_delete}>
        <span>{idPost}</span>
        <button
          onClick={() => {
            onDeletePost(idPost);
          }}>
          X
        </button>
      </div>
    </div>
  );
};
export default Post;
