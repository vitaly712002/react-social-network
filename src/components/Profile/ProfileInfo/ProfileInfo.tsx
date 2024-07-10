import React, { ChangeEvent, useState } from 'react';
import style from './ProfileInfo.module.css';
import userPhoto from '../../../assets/img/user.jpg';
import ProfileStatus from './ProfileStatus';
import ProfileDataEdit from './ProfileDataForm';
import ProfileData from './ProfileData';
import { ProfileType } from '../../../types/types';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';

type PropsType = {
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
  isOwner: boolean;
};

const ProfileInfo: React.FC<PropsType> = ({
  savePhoto,
  saveProfile,
  isOwner,
}) => {
  const { profile, status } = useSelector(
    (state: AppStateType) => state.profilePage,
  );
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };
  const [editMode, setEditMode] = useState(false);
  const onSubmit = (formData: ProfileType) => {
    // TODO: Remove Then
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      {profile && (
        <div>
          <div>
            <img
              className={style.profileImg}
              src={profile.photos.large || userPhoto}
              alt=""
            />
            <div>
              {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
            </div>
          </div>
          {editMode ? (
            <ProfileDataEdit
              initialValues={profile}
              profile={profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              goToEditMode={() => {
                setEditMode(true);
              }}
            />
          )}
          <div>
            {!isOwner && (
              <div>
                <span>{status || 'Статуса нету'}</span>
              </div>
            )}
          </div>
        </div>
      )}
      <hr />
      {isAuth && isOwner && <ProfileStatus status={status} />}
    </div>
  );
};

export default ProfileInfo;
