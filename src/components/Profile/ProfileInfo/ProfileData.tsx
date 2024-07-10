import React from 'react';
import { ContactsType, ProfileType } from '../../../types/types';
import Contacts from './Contacts';
type PropsType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};
const ProfileData: React.FC<PropsType> = ({
  profile,
  goToEditMode,
  isOwner,
}) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>EditMode</button>
        </div>
      )}
      <div>fullName: {profile.fullName}</div>
      <div>userId: {profile.userId} </div>
      <div>aboutMe:{profile.aboutMe || 'Нечего не написано'}</div>
      <div>lookingForAJob: {profile.lookingForAJob ? 'Да' : 'Не ищет'}</div>
      <div>
        lookingForAJobDescription:{' '}
        {profile.lookingForAJobDescription || 'Навыки не указаны'}
      </div>
      <div>
        <div>Contacts:</div>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contacts
              key={key}
              contactKey={key}
              contactValue={profile.contacts[key as keyof ContactsType]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileData;
