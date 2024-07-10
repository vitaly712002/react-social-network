import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
import style from './../common/FormsControls/FormsControls.module.css';

type LoginFormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
};
type LoginFormOwnProps = {
  captchaUrl: string | null;
};
const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl,
  );

  const logIn = (formData: LoginFormDataType) => {
    let { email, password, rememberMe, captcha } = formData;
    dispatch(login(email, password, rememberMe, captcha));
  };
  if (isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm captchaUrl={captchaUrl} onSubmit={logIn} />
    </div>
  );
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormDataType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, captchaUrl, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          placeholder="email"
          name="email"
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder="password"
          name="password"
          component={Input}
          validate={[required]}
          type="password"
        />
      </div>
      <div>
        <Field name="rememberMe" type="checkbox" component="input" />
        <label>RememberMe</label>
      </div>
      {captchaUrl && (
        <div>
          <img alt="captcha" src={captchaUrl} />
          <Field
            placeholder="captcha"
            name="captcha"
            component={Input}
            validate={[required]}
          />
        </div>
      )}

      <button>log in</button>
      {error && <div className={style.commonError}>{error}</div>}
    </form>
  );
};
const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnProps>({
  form: 'login',
})(LoginForm);

export default LoginPage;
