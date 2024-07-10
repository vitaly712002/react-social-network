import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/profile-api';
import { PostType, ProfileType, PhotosType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>;
type InitialStateType = typeof initialState;
let initialState = {
  posts: [
    {
      text: "Hi,it's my first post",
      id: 1,
      likesCount: 11,
      img:
        'https://i.pinimg.com/originals/80/e5/0d/80e50d775e936217f89af2de58ba7646.jpg',
    },
    {
      text: "It's cool",
      id: 2,
      likesCount: 12,
      img:
        'https://i.pinimg.com/originals/53/f9/8a/53f98a6b76f60356b2b4c261963377e6.jpg',
    },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '' as string,
};

const profileReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes,
): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let newPost = {
        text: action.newPostText,
        id: 3,
        likesCount: 11,
        img:
          'https://i.pinimg.com/originals/80/e5/0d/80e50d775e936217f89af2de58ba7646.jpg',
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case 'DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.idPost),
      };
    }
    case 'SET_USER_PROFILE': {
      return { ...state, profile: action.userProfile };
    }
    case 'SET_STATUS': {
      return { ...state, status: action.status };
    }
    case 'SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default: {
      return state;
    }
  }
};
export const actions = {
  addPost: (newPostText: string) =>
    ({
      type: 'ADD_POST',
      newPostText,
    } as const),
  deletePost: (idPost: number) =>
    ({
      type: 'DELETE_POST',
      idPost,
    } as const),

  setUserProfile: (userProfile: ProfileType) => {
    return {
      type: 'SET_USER_PROFILE',
      userProfile,
    } as const;
  },
  setStatus: (status: string) => {
    return {
      type: 'SET_STATUS',
      status,
    } as const;
  },
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: 'SAVE_PHOTO_SUCCESS',
      photos,
    } as const),
};

export let getUserProfile = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
  };
};
export let getStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
  };
};
export let updateStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  };
};
export let savePhoto = (file: File): ThunkType => {
  return async (dispatch) => {
    let { data, resultCode } = await profileAPI.savePhoto(file);
    if (resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.photos));
    }
  };
};
export let saveProfile = (profile: ProfileType): ThunkType => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
      if (userId !== null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      dispatch(
        stopSubmit('editProfile', {
          _error: data.messages[0],
        }),
      );
    }
  };
};

export default profileReducer;
