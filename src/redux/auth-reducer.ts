import { stopSubmit } from 'redux-form';

import { authAPI } from '../api/auth-api';
import { ResultCodesEnum } from '../api/api';
import { securityApi } from '../api/security-api';
import { InferActionsTypes, BaseThunkType } from './redux-store';
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>;
let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

const authReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case 'SET_AUTH_USER_DATA': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'GET_CAPTCHA_URL_SUCCESS': {
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    }
    default: {
      return state;
    }
  }
};
const actions = {
  setAuthUserData: (
    email: string | null,
    userId: number | null,
    login: string | null,
    isAuth: boolean,
  ) => {
    return {
      type: 'SET_AUTH_USER_DATA',
      payload: { userId, email, login, isAuth },
    } as const;
  },
  getCaptchaUrlSuccess: (captchaUrl: string) => {
    return { type: 'GET_CAPTCHA_URL_SUCCESS', captchaUrl } as const;
  },
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let data = await authAPI.me();
  if (data.resultCode === ResultCodesEnum.Success) {
    let { email, id, login } = data.data;
    dispatch(actions.setAuthUserData(email, id, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string | null,
): ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
      dispatch(getCaptachaUrl());
    }
    let messageError =
      data.messages.length > 0 ? data.messages[0] : 'some error';
    dispatch(
      stopSubmit('login', {
        _error: messageError,
      }),
    );
  }
};

export const logout = (): ThunkType => async (dispatch) => {
  let data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};
export const getCaptachaUrl = (): ThunkType => async (dispatch) => {
  let { url } = await securityApi.getCaptchaUrl();

  const captchaUrl = url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
