import {
  maxLengthCreator,
  required,
} from '../../../../utils/validators/validators';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea } from '../../../common/FormsControls/FormsControls';
type PropsType = {};
export type AddPostFormValuesType = {
  newPostText: string;
};
const maxlength = maxLengthCreator(50);
const AddPostForm: React.FC<
  InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={Textarea}
          placeholder="Введите текст"
          validate={[required, maxlength]}
        />
      </div>
      <div>
        <button>Добавить пост</button>
      </div>
    </form>
  );
};
export default reduxForm<AddPostFormValuesType, PropsType>({
  form: 'addPostForm',
})(AddPostForm);
