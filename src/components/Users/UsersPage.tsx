import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FilterType,
  requestUsers,
  follow,
  unfollow,
} from '../../redux/users-reducer';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../redux/users-selectors';
import style from './Users.module.css';

import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';
import Preloader from '../common/preloader/preloader';
import { useHistory } from 'react-router-dom';

type PropsType = {};

const UsersPage: React.FC<PropsType> = () => {
  const dispatch = useDispatch();
  const followHandle = (userId: number) => dispatch(follow(userId));
  const unfollowHandle = (userId: number) => dispatch(unfollow(userId));

  const onPageChanged = (pageNumber: number) =>
    dispatch(requestUsers(pageNumber, pageSize, filter));
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  const followingInProgress = useSelector(getFollowingInProgress);
  const currentPage = useSelector(getCurrentPage);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getUsers);
  const isFetching = useSelector(getIsFetching);
  const history = useHistory();
  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    const page = Number(params.get('page'));
    const term = params.get('term');
    const friend = params.get('friend');
    let actualCurrentPage = currentPage;
    let actualFilter = filter;
    if (page && page !== 1) {
      actualCurrentPage = page;
    }
    if (!!term) {
      actualFilter = { ...actualFilter, term: term };
    }
    switch (friend) {
      case 'null':
        actualFilter = {
          ...actualFilter,
          friend: null,
        };

        break;
      case 'true':
        actualFilter = {
          ...actualFilter,
          friend: true,
        };

        break;
      case 'false':
        actualFilter = {
          ...actualFilter,
          friend: false,
        };
        break;
    }

    dispatch(requestUsers(actualCurrentPage, pageSize, actualFilter));
  }, []);
  useEffect(() => {
    history.push({
      pathname: '/users',
      search: `?page=${currentPage}${
        filter.term ? '&term=' + filter.term : ''
      }${filter.friend ? '&fried=' + filter.friend : ''}`,
    });
  }, [filter, currentPage]);
  return (
    <>
      {isFetching ? <Preloader /> : null}

      <div className={style.users}>
        <UsersSearchForm filter={filter} onFilterChanged={onFilterChanged} />
        <Paginator
          onPageChanged={onPageChanged}
          currentPage={currentPage}
          totalUsersCount={totalUsersCount}
          pageSize={pageSize}
          portionSize={15}
        />
        {users.map((u, index) => (
          <User
            key={index}
            user={u}
            unfollow={unfollowHandle}
            follow={followHandle}
            followingInProgress={followingInProgress}></User>
        ))}
      </div>
    </>
  );
};

export default UsersPage;
