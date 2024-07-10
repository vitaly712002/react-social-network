import { AppStateType } from './redux-store';

export let getUsers = (state: AppStateType) => {
  return state.usersPage.users;
};
export let getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export let getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};
export let getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export let getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
export let getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};
export let getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter;
};
