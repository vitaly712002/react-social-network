import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { ProfileType } from '../../../types/types';
import {
  maxLengthCreator,
  required,
} from '../../../utils/validators/validators';
import { Input, Textarea } from '../../common/FormsControls/FormsControls';
type PropsType = {
  profile: ProfileType;
  initialValues: ProfileType;
  onSubmit: (formData: ProfileType) => void;
};
const maxLength = maxLengthCreator(40);

const ProfileDataEdit: React.FC<PropsType> = (props) => {
  return <ProfileDataFormReduxForm {...props} />;
};
const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({ profile, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <button>Save</button>
      <div>
        fullName:
        <div>
          <Field
            placeholder="fullName"
            name="fullName"
            component={Input}
            validate={[required]}
          />
        </div>
      </div>
      <div>
        aboutMe:
        <div>
          <Field
            name="aboutMe"
            component={Textarea}
            placeholder="Введите текст"
            validate={[required, maxLength]}
          />
        </div>
      </div>
      <div>
        lookingForAJob:
        <div>
          <Field name="lookingForAJob" component={Input} type="checkbox" />
        </div>
      </div>
      <div>
        lookingForAJobDescription:
        <div>
          <Field
            name="lookingForAJobDescription"
            component={Textarea}
            placeholder="Введите текст"
            validate={[required, maxLength]}
          />
        </div>
      </div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key}>
              {key}:
              <div>
                <Field
                  name={'contacts.' + key}
                  component={Input}
                  placeholder={key}
                  validate={[]}
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};
const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
  form: 'editProfile',
})(ProfileDataForm);
export default ProfileDataEdit;
