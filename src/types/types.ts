export type PostType = {
  text: string;
  id: number;
  likesCount: number;
  img: string;
};
export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
export type PhotosType = {
  small: string | null;
  large: string | null;
};
export type ProfileType = {
  userId: number;
  lookingForAJobDescription: string;
  lookingForAJob: boolean;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe: string;
};
export type UserType = {
  name: string;
  id: number;
  status: string;
  photos: PhotosType;
  followed: boolean;
};
