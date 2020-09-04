import React, { useState, useEffect } from 'react';
import SideBarHeaderForm from '../../components/common/SidebarHeaderForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeInput,
  patchEmployByCertCode,
  initialize,
} from '../../modules/common/certCode';

const SidebarHeaderContainer = ({ onLogout, branchs, user }) => {
  const dispatch = useDispatch();
  const { certCode, certCodeResult, certCodeError } = useSelector(
    ({ certCode }) => ({
      certCode: certCode.certCode,
      certCodeError: certCode.certCodeError,
      certCodeResult: certCode.certCodeResult,
    }),
  );
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const onChange = (e) => {
    const certCode = e.target.value;
    dispatch(changeInput({ certCode }));

    setError('');
  };

  const onPatchEmployByCertCode = () => {
    if (certCode === '') {
      setError('인증코드를 입력해주세요');
      return;
    }
    if (certCode.length !== 6) {
      setError('인증코드는 6자리 입니다.');
      return;
    }

    const { name } = user;
    dispatch(patchEmployByCertCode({ memberId: name, certCode }));
  };

  useEffect(() => {
    if (certCodeResult === true) {
      closeModal();

      alert('지점등록에 성공했습니다.');
      dispatch(initialize());

      return;
    }
    if (certCodeResult === false) {
      setError('잘못된 인증번호 입니다.');
      dispatch(initialize());
    }
  }, [certCodeResult, dispatch]);

  useEffect(() => {
    if (certCodeError !== null) {
      setError(certCodeError);
    }
  }, [certCodeError]);

  return (
    <div>
      <SideBarHeaderForm
        branchs={branchs}
        user={user}
        show={show}
        closeModal={closeModal}
        openModal={openModal}
        onLogout={onLogout}
        onChange={onChange}
        onPatchEmployByCertCode={onPatchEmployByCertCode}
        error={error}
      />
    </div>
  );
};

export default SidebarHeaderContainer;
