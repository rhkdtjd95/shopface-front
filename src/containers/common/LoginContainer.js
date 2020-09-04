import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/common/AuthForm';
import { changeInput, login, initializeForm } from '../../modules/common/auth';
import AuthTemplate from '../../components/common/AuthTemplate';
import { withRouter } from 'react-router-dom';
import { initialize } from '../../modules/common/certCode';

const LoginForm = ({ history, match }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, user, authError } = useSelector(({ auth }) => ({
    form: auth.login,
    user: auth.user,
    authError: auth.authError,
  }));

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInput({
        type: 'login',
        id: name,
        value,
      }),
    );

    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { id, password } = form;
    if ([id, password].includes('')) {
      setError('빈 칸을 모두 입력하세요');

      return;
    }
    dispatch(initializeForm());
    dispatch(login({ id, password }));
  };

  useEffect(() => {
    if (authError !== null) {
      if (authError === 'Incorrect username or password.') {
        setError('아이디 또는 비밀번호가 틀렸습니다.');
        return;
      }
      if (authError === 'User is not confirmed.') {
        setError('이메일 구독확인이 되지 않았습니다. 이메일을 확인 하세요');
        return;
      }
      setError(authError);
    }
  }, [authError, dispatch]);

  useEffect(() => {
    if (user !== null) {
      if (user.type === 'A') {
        history.push('/member');
        return;
      }

      history.push('/');
    }
    dispatch(initialize());
  }, [history, dispatch, user]);

  return (
    <AuthTemplate>
      <AuthForm
        type="login"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </AuthTemplate>
  );
};

export default withRouter(LoginForm);
