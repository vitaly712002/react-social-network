import { instance, APIResponseType } from './api';
import { PhotosType, ProfileType } from './../types/types';
type SavePhotoResponseDataType = {
  photos: PhotosType;
};
export let profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/` + userId).then((response) => {
      return response.data;
    });
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/` + userId).then((response) => {
      return response.data;
    });
  },
  updateStatus(status: string) {
    return instance
      .put<APIResponseType>(`profile/status`, { status: status })
      .then((response) => {
        return response.data;
      });
  },
  savePhoto(photoFile: File) {
    let formData = new FormData();
    formData.append('image', photoFile);
    return instance
      .put<APIResponseType<SavePhotoResponseDataType>>(
        'profile/photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  },
  saveProfile(profile: ProfileType) {
    return instance
      .put<APIResponseType>('profile', profile)
      .then((response) => {
        return response.data;
      });
  },
};
