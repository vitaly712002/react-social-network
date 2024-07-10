import { AppStateType } from './redux-store';

export let getAuthUserId = (state: AppStateType) => {
  return state.auth.userId;
};
export let getAuthEmail = (state: AppStateType) => {
  return state.auth.email;
};
export let getAuthLogin = (state: AppStateType) => {
  return state.auth.login;
};
export let getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};
