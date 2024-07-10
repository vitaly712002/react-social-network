import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';
type PropsType = {
  id: number;
  name: string;
};
const DialogItem: React.FC<PropsType> = ({ id, name }) => {
  return (
    <NavLink
      className={s.item}
      activeClassName={s.active}
      to={'/dialogs/' + id}>
      {name}
    </NavLink>
  );
};
export default DialogItem;
