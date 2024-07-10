import { usersAPI } from '../api/users-api';
import { UserType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 250,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  filter: { term: '', friend: null as null | boolean },
};

const usersReducer = (
  state = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'TOGGLE_FOLLOW': {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed };
          }
          return user;
        }),
      };
    }
    case 'SET_USERS': {
      return {
        ...state,
        users: action.users,
      };
    }
    case 'SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.pageNumber,
      };
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }
    case 'TOGGLE_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    case 'SET_FILTER': {
      return {
        ...state,
        filter: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const actions = {
  toggleFollow: (userId: number) => {
    return { type: 'TOGGLE_FOLLOW', userId } as const;
  },
  setFilter: (filter: FilterType) => {
    return { type: 'SET_FILTER', payload: filter } as const;
  },
  setUsers: (users: Array<UserType>) => {
    return { type: 'SET_USERS', users } as const;
  },

  setCurrentPage: (pageNumber: number = 1) => {
    return { type: 'SET_CURRENT_PAGE', pageNumber } as const;
  },

  setTotalUsersCount: (totalUsersCount: number) => {
    return { type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const;
  },

  toggleIsFetching: (isFetching: boolean) => {
    return { type: 'TOGGLE_IS_FETCHING', isFetching } as const;
  },
  toggleFollowingProgress: (isFetching: boolean, userId: number) => {
    return {
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const;
  },
};

export let follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await usersAPI.followUser(userId);
    if (data.resultCode === 0) {
      dispatch(actions.toggleFollow(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
  };
};
export let unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await usersAPI.unfollowUser(userId);
    if (data.resultCode === 0) {
      dispatch(actions.toggleFollow(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
  };
};

export let requestUsers = (
  currentPage: number,
  pageSize: number,
  filter: FilterType,
): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setFilter(filter));
    let data = await usersAPI.getUsers(
      currentPage,
      pageSize,
      filter.term,
      filter.friend,
    );
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setCurrentPage(currentPage));
  };
};
export default usersReducer;
