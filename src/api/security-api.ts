import { instance } from './api';

type GetCaptchaUrlResponseDataType = {
  url: string;
};

export const securityApi = {
  getCaptchaUrl() {
    return instance
      .get<GetCaptchaUrlResponseDataType>('/security/get-captcha-url')
      .then((response) => {
        return response.data;
      });
  },
};
