import React, { useState, useEffect } from 'react';
import EmployDetailForm from '../../components/employ/EmployDetailForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeInput,
  employUpdate,
  employDisable,
  employInvite,
  getEmployDetail,
  initializeResult,
  initializeDisable,
  initializeInvite,
  // initializeDetail,
} from '../../modules/employ/employDetail';
import { getEmployList } from '../../modules/employ/employList';
import { checkExpire, logout } from '../../lib/api/common/authAPI';
import branchSelect from '../../modules/branch/branchSelect';
// import { initializeForm } from '../../modules/common/alarm';

const EmployDetailContainer = ({ match, history }) => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const {
    employ,
    employResult,
    employError,
    user,
    inviteResult,
    disableResult,
    selectedBranch,
  } = useSelector(({ employDetail, auth, branchSelect }) => ({
    employ: employDetail.employ,
    employError: employDetail.employError,
    employResult: employDetail.employResult,
    inviteResult: employDetail.inviteResult,
    disableResult: employDetail.disableResult,
    selectedBranch: branchSelect.selectedBranch,
    user: auth.user,
  }));

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInput({
        key: name,
        value,
      }),
    );
  };

  const onInvite = () => {
    const no = match.params.no;
    dispatch(employInvite({ no }));
  };

  const onDisabled = () => {
    const no = match.params.no;
    dispatch(employDisable({ no }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = employ;
    if ([data.salary, data.name].includes('')) {
      setError('빈 칸을 모두 입력하세요');
      return;
    }
    const no = match.params.no;
    dispatch(employUpdate({ no, data }));
  };

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });
      const no = match.params.no;
      dispatch(getEmployDetail({ no }));
    }
  }, [dispatch, match.params.no, user]);

  useEffect(() => {
    if (disableResult === 'OK') {
      alert('비활성화 되었습니다');
      dispatch(initializeDisable());
      history.push('/employ');
      const no = match.params.no;
      dispatch(getEmployDetail({ no }));
    }
  }, [disableResult, history, dispatch, match.params.no]);

  useEffect(() => {
    if (inviteResult === 'OK') {
      alert('다시 초대했습니다');
      dispatch(initializeInvite());
      history.push('/employ');
      const no = match.params.no;
      dispatch(getEmployDetail({ no }));
    }
  }, [inviteResult, history, dispatch, match.params.no]);

  useEffect(() => {
    if (employResult === 'OK') {
      alert('수정되었습니다');
      dispatch(initializeResult());

      history.push('/employ');
    }
  }, [employResult, history, dispatch]);

  useEffect(() => {
    if (employError !== null) {
      setError(employError);
    }
  }, [employError]);

  return (
    <div>
      <EmployDetailForm
        onSubmit={onSubmit}
        onChange={onChange}
        error={error}
        employ={employ}
        onDisabled={onDisabled}
        onInvite={onInvite}
      ></EmployDetailForm>
    </div>
  );
};

export default EmployDetailContainer;
