import { instance, GetItemsType, APIResponseType } from './api';

export let usersAPI = {
  getUsers(
    currentPage = 1,
    pageSize = 10,
    term: string = '',
    friend: null | boolean = null,
  ) {
    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? '' : `&friend=${friend}`),
      )
      .then((response) => {
        return response.data;
      });
  },

  followUser(userId: number) {
    return instance
      .post<APIResponseType>(`follow/${userId}`)
      .then((response) => {
        return response.data;
      });
  },
  unfollowUser(userId: number) {
    return instance.delete(`follow/${userId}`).then((response) => {
      return response.data;
    }) as Promise<APIResponseType>;
  },
};
