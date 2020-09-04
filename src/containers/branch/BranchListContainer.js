import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BranchListForm from '../../components/branch/BranchListForm';
import { checkExpire } from '../../lib/api/common/authAPI';
import {
  confirmBranch,
  getAdminBranchList,
  getBranchList,
  initializeForm,
  rejectBranch,
} from '../../modules/branch/branchList';
import { logout } from '../../modules/common/auth';

const BranchListContainer = () => {
  const [modal, setModal] = useState({ targetModal: '', show: false });
  const closeModal = () => setModal({ targetModal: '', show: false });
  const openModal = (no) => setModal({ targetModal: no, show: true });

  const dispatch = useDispatch();
  const { branchs, branchResult, branchError, loading, user } = useSelector(
    ({ branchList, loading, auth }) => ({
      branchs: branchList.branchs,
      branchResult: branchList.branchResult,
      branchError: branchList.branchError,
      loading: loading,
      user: auth.user,
    }),
  );
  const onModalBtn = (e) => {
    const no = e.target.value;
    openModal(no);
  };
  const onConfirm = (e) => {
    const no = e.target.value;
    dispatch(confirmBranch({ no }));
  };
  const onReject = (e) => {
    const no = e.target.value;
    dispatch(rejectBranch({ no }));
  };

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });

      if (user.type === 'A') {
        dispatch(getAdminBranchList());
        return;
      }
      const { name } = user;
      dispatch(getBranchList({ name }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (branchResult === 'OK') {
      alert(`승인 현황이 변경되었습니다`);

      dispatch(initializeForm());
      dispatch(getAdminBranchList());
    }
  });

  useEffect(() => {
    if (branchError !== null) {
      if (branchError === undefined) {
        alert('오류가 발생했습니다.');
      } else {
        alert(`사업장 승인 ${branchError}을(를) 실패했습니다.`);

        dispatch(initializeForm());
        dispatch(getAdminBranchList());
      }
    }
  });

  return (
    <div>
      <BranchListForm
        branchs={branchs}
        user={user}
        branchError={branchError}
        loading={loading}
        modal={modal}
        closeModal={closeModal}
        onModalBtn={onModalBtn}
        onConfirm={onConfirm}
        onReject={onReject}
      ></BranchListForm>
    </div>
  );
};

export default withRouter(BranchListContainer);
