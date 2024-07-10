import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../../redux/profile-reducer';
type PropsType = {
  status: string;
};

const ProfileStatus: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  let activateEditMode = () => {
    setEditMode(true);
  };
  let deactivateEditMode = (e: ChangeEvent<HTMLInputElement>) => {
    setEditMode(false);
    if (e.currentTarget.value) {
      dispatch(updateStatus(status));
    }
  };
  let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);
  return (
    <div>
      {editMode ? (
        <input
          autoFocus
          onChange={onStatusChange}
          onBlur={deactivateEditMode}
          value={status}
        />
      ) : (
        <span onClick={activateEditMode}>
          {status ? status : 'Введите статус'}
        </span>
      )}
    </div>
  );
};

export default ProfileStatus;
