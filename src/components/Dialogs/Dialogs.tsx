import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { initialStateType } from '../../redux/dialogs-reducer';
type PropsType = {
  dialogsPage: initialStateType;
  sendMessage: (messageText: string) => void;
};
type NewMessageValuesFormType = {
  newMessageText: string;
};
type AddMessageFormType = {};
const Dialogs: React.FC<PropsType> = (props) => {
  let DialogsElements = props.dialogsPage.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));

  let MessagesElements = props.dialogsPage.messages.map((message) => (
    <Message message={message.message} />
  ));

  let sendNewMessage = (values: { newMessageText: string }) => {
    props.sendMessage(values.newMessageText);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>{DialogsElements}</div>
      <div className={s.messages}>{MessagesElements}</div>
      <AddMessageFormRedux onSubmit={sendNewMessage} />
    </div>
  );
};

const maxLength = maxLengthCreator(50);
const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageValuesFormType, AddMessageFormType> &
    AddMessageFormType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newMessageText"
          component={Textarea}
          placeholder="Введите сообщение"
          validate={[required, maxLength]}
        />
      </div>
      <button>Отправить</button>
    </form>
  );
};
const AddMessageFormRedux = reduxForm<NewMessageValuesFormType>({
  form: 'dialogAddMessageForm',
})(AddMessageForm);
export default Dialogs;
