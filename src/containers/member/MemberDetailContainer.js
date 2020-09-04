import React, { useEffect, useState } from 'react';
import MemberDetailForm from '../../components/member/MemberDetailForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeInput,
  getMemberDetail,
  memberUpdate,
  memberDelete,
  initializeResult,
  changePassword,
  updatePassword,
} from '../../modules/member/memberDetail';
import { checkExpire } from '../../lib/api/common/authAPI';
import { withRouter } from 'react-router-dom';
import { logout } from '../../modules/common/auth';

const MemberDetailContainer = ({ match, history }) => {
  const dispatch = useDispatch();
  const {
    member,
    memberPassword,
    memberResult,
    memberError,
    passwordError,
    user,
  } = useSelector(({ memberDetail, auth }) => ({
    member: memberDetail.member,
    memberPassword: memberDetail.password,
    memberResult: memberDetail.memberResult,
    memberError: memberDetail.memberError,
    passwordError: memberDetail.passwordError,
    user: auth.user,
  }));

  const [id, setId] = useState(match.params.id);
  const [error, setError] = useState(null);
  const [pwdError, setPwdError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const [showForm, setShowForm] = useState(false);
  const closeForm = () => {
    dispatch(initializeResult('password'));
    setShowForm(false);
  };
  const openForm = () => setShowForm(true);

  const handleComplete = (data) => {
    let value = data.address;
    dispatch(changeInput({ key: 'address', value }));

    value = data.zonecode;
    dispatch(changeInput({ key: 'zipCode', value }));

    closeModal();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInput({
        key: name,
        value,
      }),
    );

    setError('');
  };

  const onChangePassword = (e) => {
    const { name, value } = e.target;
    dispatch(
      changePassword({
        key: name,
        value,
      }),
    );

    setPwdError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = member;
    if (
      [
        data.name,
        data.password,
        data.email,
        data.email,
        data.zoneCode,
        data.address,
        data.detailAddress,
        data.accountNum,
        data.bankName,
        data.phone,
      ].includes('')
    ) {
      setError('빈 칸을 모두 입력하세요');
      return;
    }
    dispatch(memberUpdate({ id, data }));
  };

  const onUpdatePassword = () => {
    const data = memberPassword;
    if ([data.originPassword, data.newPassword].includes('')) {
      setPwdError('비밀번호를 입력하세요');

      return;
    }
    dispatch(updatePassword({ data }));
  };

  const onDelete = (e) => {
    dispatch(memberDelete({ id }));
  };

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });

      dispatch(getMemberDetail({ id }));
    }
  }, [dispatch, user, id]);

  useEffect(() => {
    if (user !== null) {
      if (id != null && id !== user.name) {
        setDisabled(true);
      }
    }
  }, [member, id, user]);

  useEffect(() => {
    if (memberResult === 'OK') {
      alert('변경되었습니다');

      setError('');
      dispatch(initializeResult('password'));

      if (id === user.name) {
        return;
      }
      history.push('/member');
    }
  }, [memberResult, history, dispatch, id]);

  useEffect(() => {
    if (passwordError !== null) {
      setPwdError(passwordError);
    }
    if (memberError !== null) {
      setError(memberError);
    }

    dispatch(initializeResult(''));
  }, [memberError, passwordError, dispatch]);

  return (
    <div>
      <MemberDetailForm
        member={member}
        show={show}
        showForm={showForm}
        error={error}
        pwdError={pwdError}
        disabled={disabled}
        onSubmit={onSubmit}
        onChange={onChange}
        onChangePassword={onChangePassword}
        onUpdatePassword={onUpdatePassword}
        onDelete={onDelete}
        openModal={openModal}
        closeModal={closeModal}
        openForm={openForm}
        closeForm={closeForm}
        handleComplete={handleComplete}
      ></MemberDetailForm>
    </div>
  );
};

export default withRouter(MemberDetailContainer);
