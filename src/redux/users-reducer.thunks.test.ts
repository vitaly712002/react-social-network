import { APIResponseType, ResultCodesEnum } from './../api/api';
import { actions, follow, unfollow } from './users-reducer';
import { usersAPI } from './../api/users-api';
jest.mock('./../api/users-api');

const dispatchMock = jest.fn();
const getStateMock = jest.fn();
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};
beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  userAPIMock.followUser.mockClear();
  userAPIMock.unfollowUser.mockClear();
});
// @ts-ignore

test('thunk follow', async () => {
  const thunk = follow(1);
  userAPIMock.followUser.mockReturnValue(Promise.resolve(result));
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 1),
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgress(false, 1),
  );
});

test('success unfollow thunk', async () => {
  const thunk = unfollow(1);
  userAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 1),
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgress(false, 1),
  );
});
