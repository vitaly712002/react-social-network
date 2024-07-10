import { useState } from 'react';
import style from './Paginator.module.css';

import classnames from 'classnames';
type PropsType = {
  portionSize: number;
  currentPage: number;
  pageSize: number;
  totalUsersCount: number;
  onPageChanged: (pageNumber: number) => void;
};
const Paginator: React.FC<PropsType> = ({
  portionSize,
  currentPage,
  pageSize,
  totalUsersCount,
  onPageChanged,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && (
        <button
          className={style.btn_prev}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}>
          PREV
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber,
        )
        .map((p) => {
          return (
            <button
              className={classnames({
                [style.currentPage]: currentPage === p,
              })}
              key={p}
              onClick={() => onPageChanged(p)}>
              {p}
            </button>
          );
        })}
      {pagesCount > portionNumber && (
        <button
          className={style.btn_next}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}>
          NEXT
        </button>
      )}
    </div>
  );
};
export default Paginator;
