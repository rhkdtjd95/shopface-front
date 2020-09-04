import React, { useEffect, useState } from 'react';
import BranchPostForm from '../../components/branch/BranchPostForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeInput,
  postBranch,
  initializeForm,
} from '../../modules/branch/branchPost';
import { withRouter } from 'react-router-dom';
import { checkExpire } from '../../lib/api/common/authAPI';
import { logout } from '../../modules/common/auth';

const BranchPostContainer = ({ history }) => {
  const [error, setError] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const dispatch = useDispatch();
  const { branchPost, postResult, postError, user } = useSelector(
    ({ branchPost, auth }) => ({
      branchPost: branchPost.post,
      postResult: branchPost.postResult,
      postError: branchPost.postError,
      user: auth.user,
    }),
  );

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

  const onSubmit = (e) => {
    e.preventDefault();
    const data = branchPost;
    if (
      [
        data.name,
        data.phone,
        data.address,
        data.detailAddress,
        data.zipCode,
      ].includes('')
    ) {
      setError('빈 칸을 모두 입력하세요');
      return;
    }

    dispatch(
      postBranch({
        post: {
          name: data.name,
          phone: data.phone,
          address: data.address,
          detailAddress: data.detailAddress,
          zipCode: data.zipCode,
          memberId: user.name,
        },
      }),
    );
  };

  const handleComplete = (data) => {
    let value = data.address;
    setAddress(value);
    dispatch(changeInput({ key: 'address', value }));

    value = data.zonecode;
    setZipCode(value);
    dispatch(changeInput({ key: 'zipCode', value }));

    closeModal();
  };

  useEffect(() => {
    if (postResult === 'OK') {
      dispatch(initializeForm('post'));
      history.push('/branch');
    }
  }, [history, dispatch, postResult]);

  useEffect(() => {
    if (postError !== null) {
      setError('등록에 실패 했습니다.');
    }
  }, [postError]);

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });
    }
    dispatch(initializeForm('post'));
  }, [dispatch, user]);

  return (
    <BranchPostForm
      error={error}
      show={show}
      closeModal={closeModal}
      openModal={openModal}
      zipCode={zipCode}
      address={address}
      handleComplete={handleComplete}
      onSubmit={onSubmit}
      onChange={onChange}
    ></BranchPostForm>
  );
};

export default withRouter(BranchPostContainer);
