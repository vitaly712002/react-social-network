import usersReducer, { InitialStateType, actions } from './users-reducer';
let state: InitialStateType;
beforeEach(() => {
  state = {
    users: [
      {
        name: 'string1',
        id: 0,
        status: 'status1',
        photos: { small: null, large: null },
        followed: false,
      },
      {
        name: 'string2',
        id: 1,
        status: 'status2',
        photos: { small: null, large: null },
        followed: false,
      },
      {
        name: 'string3',
        id: 1,
        status: 'status3',
        photos: { small: null, large: null },
        followed: true,
      },
    ],
    pageSize: 10,
    totalUsersCount: 250,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
  };
});
test('Проверка отписки/подписки на пользователя', () => {
  let newState = usersReducer(state, actions.toggleFollow(1));
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
  expect(newState.users[2].followed).toBeFalsy();
});
test('Проверка изменения страницы', () => {
  let newState = usersReducer(state, actions.setCurrentPage(1));
  expect(newState.currentPage).toBe(1);
  newState = usersReducer(state, actions.setCurrentPage(2));
  expect(newState.currentPage).toBe(2);
});
