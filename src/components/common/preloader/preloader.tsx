import React from 'react';
import style from './preloader.module.css';
import preloader from '../../../assets/img/preloader.svg';
const Preloader = () => {
  return (
    <div className={style.preloader}>
      <img src={preloader} alt="" />
    </div>
  );
};
export default Preloader;
