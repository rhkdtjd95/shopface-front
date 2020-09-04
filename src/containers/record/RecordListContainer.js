import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RecordListForm from '../../components/record/RecordListForm';
import {
  getBusinessRecordList,
  getEmployRecordList,
} from '../../modules/record/recordList';
import { checkExpire } from '../../lib/api/common/authAPI';
import { logout } from '../../modules/common/auth';

const RecordListContainer = () => {
  const { employRecords, businessRecords, user, selectedBranch } = useSelector(
    ({ recordList, auth, branchSelect }) => ({
      employRecords: recordList.employRecords,
      businessRecords: recordList.businessRecords,
      user: auth.user,
      selectedBranch: branchSelect.selectedBranch,
    }),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });
      dispatch(getEmployRecordList({ id: user.name }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });
      dispatch(getBusinessRecordList({ selectedBranch }));
    }
  }, [dispatch, user, selectedBranch]);

  return (
    <RecordListForm
      employRecords={employRecords}
      businessRecords={businessRecords}
    ></RecordListForm>
  );
};

export default withRouter(RecordListContainer);
