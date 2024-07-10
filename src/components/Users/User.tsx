//@ts-ignore
import userPhoto from '../../assets/img/user.jpg';

import { NavLink } from 'react-router-dom';
//@ts-ignore
import style from './Users.module.css';
import { UserType } from '../../types/types';

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};
const User: React.FC<PropsType> = ({
  unfollow,
  follow,
  followingInProgress,
  user,
}) => {
  return (
    <div key={user.id} className={style.user}>
      <NavLink to={'/profile/' + user.id}>
        <img
          className={style.photo}
          src={user.photos.large ? user.photos.large : userPhoto}
          alt="a sad frog"
        />
      </NavLink>

      <div className={style.name}>{user.name}</div>

      <button
        disabled={followingInProgress.some((id: number) => id === user.id)}
        onClick={() => {
          if (!user.followed) {
            follow(user.id);
          } else {
            unfollow(user.id);
          }
        }}>
        {user.followed ? 'Отписаться' : 'Подписаться'}
      </button>
    </div>
  );
};

export default User;
