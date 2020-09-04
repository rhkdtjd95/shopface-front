import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/common/AuthForm';
import {
  changeInput,
  initializeForm,
  registerMember,
} from '../../modules/common/auth';
import { initialize } from '../../modules/common/certCode';
import AuthTemplate from '../../components/common/AuthTemplate';
import { withRouter } from 'react-router-dom';

const RegisterContainer = ({ history, match }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { register, user, authError, registerResult, certCode } = useSelector(
    ({ auth, certCode }) => ({
      register: auth.register,
      user: auth.user,
      authError: auth.authError,
      registerResult: auth.registerResult,
      certCode: certCode.certCode,
    }),
  );

  const onChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    if (name === 'id') {
      dispatch(
        changeInput({
          type: 'register',
          id: 'email',
          value,
        }),
      );
    }

    dispatch(
      changeInput({
        type: 'register',
        id: name,
        value,
      }),
    );

    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let member = Object.assign({}, register);
    if ([member.id, member.password, member.name, member.phone].includes('')) {
      setError('빈칸을 모두 입력해주세요');
      return;
    }

    dispatch(initializeForm());
    dispatch(registerMember({ member, certCode }));
  };

  useEffect(() => {
    if (user !== null) {
      history.push('/');
      return;
    }

    dispatch(initializeForm('register'));
    setError(null);
  }, [history, dispatch]);

  useEffect(() => {
    if (authError !== null) {
      setError(authError);
      dispatch(initializeForm());
    }
  }, [authError]);

  useEffect(() => {
    if (registerResult === 'OK') {
      dispatch(initialize());
      dispatch(initializeForm());
      history.push('/login');
    }
  }, [history, registerResult]);

  return (
    <AuthTemplate>
      <AuthForm
        type="register"
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </AuthTemplate>
  );
};

export default withRouter(RegisterContainer);
