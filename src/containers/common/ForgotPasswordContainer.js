import React, { useState, useEffect } from 'react';
import AuthTemplate from '../../components/common/AuthTemplate';
import ForgotPasswordForm from '../../components/common/ForgotPasswordForm';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  sendForgotPassword,
  initializeForm,
  changeInput,
  changeForgotPassword,
} from '../../modules/common/forgotPassword';

const ForgotPasswordContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    user,
    changePassword,
    sendCodeResult,
    changePasswordResult,
    forgotPasswordError,
  } = useSelector(({ auth, forgotPassword }) => ({
    user: auth.user,
    changePassword: forgotPassword.changePassword,
    sendCodeResult: forgotPassword.sendCodeResult,
    changePasswordResult: forgotPassword.changePasswordResult,
    forgotPasswordError: forgotPassword.forgotPasswordError,
  }));

  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeInput({ key: name, value }));

    setError('');
  };

  const onSubmitCode = () => {
    if (changePassword.name === '') {
      setError('아이디를 입력해주세요');
      return;
    }
    dispatch(sendForgotPassword({ name: changePassword.name }));
  };

  const onChangePassword = () => {
    const data = changePassword;
    if ([data.name, data.changePassword, data.code].includes('')) {
      setError('빈 칸을 입력해주세요');
      return;
    }
    dispatch(changeForgotPassword({ data }));
  };

  useEffect(() => {
    if (user !== null) {
      history.push('/');
    }
    dispatch(initializeForm('changePassword'));
  }, [user, history, dispatch]);

  useEffect(() => {
    if (sendCodeResult === 'OK') {
      setResult(sendCodeResult);

      dispatch(initializeForm(''));
      return;
    }
    if (changePasswordResult === 'OK') {
      history.push('/login');
      dispatch(initializeForm('changePassword'));
    }
  }, [sendCodeResult, history, changePasswordResult, dispatch]);

  useEffect(() => {
    if (forgotPasswordError != null) {
      setError(forgotPasswordError);
      dispatch(initializeForm(''));
    }
  }, [forgotPasswordError, dispatch]);

  return (
    <>
      <AuthTemplate>
        <ForgotPasswordForm
          result={result}
          onChange={onChange}
          onSubmitCode={onSubmitCode}
          onChangePassword={onChangePassword}
          error={error}
        />
      </AuthTemplate>
    </>
  );
};

export default withRouter(ForgotPasswordContainer);
