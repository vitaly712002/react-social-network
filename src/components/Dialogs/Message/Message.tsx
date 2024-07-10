import React from 'react';

import s from './../Dialogs.module.css';
type PropsType = {
  message: string;
};
const Message: React.FC<PropsType> = ({ message }) => {
  return <div className={s.message}>{message}</div>;
};

export default Message;
