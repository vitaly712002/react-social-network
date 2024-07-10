import { instance,APIResponseType } from './api';

type LoginResponseDataType = {
  userId: number;
};
type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

export let authAPI = {
  me() {
    return instance
      .get<APIResponseType<MeResponseDataType>>(`auth/me`)
      .then((response) => {
        return response.data;
      });
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: null | string = null,
  ) {
    return instance
      .post<APIResponseType<LoginResponseDataType>>(`/auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => {
        return response.data;
      });
  },
  logout() {
    return instance.delete(`/auth/login`).then((response) => {
      return response.data;
    });
  },
};
