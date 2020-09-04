import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import BusinessDashboard from '../../components/dashboard/BusinessDashboard';
import { checkExpire } from '../../lib/api/common/authAPI';
import { logout } from '../../modules/common/auth';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBusinessWDashboard,
  getBusinessRDashboard,
  getBusinessCDashboard,
} from '../../modules/dashboard/dashboard';
import moment from 'moment';

const BusinessDashboardContainer = () => {
  const dispatch = useDispatch();
  const { businessW, businessR, businessC, user, selectedBranch } = useSelector(
    ({ dashboard, loading, auth, branchSelect }) => ({
      businessW: dashboard.businessW,
      businessR: dashboard.businessR,
      businessC: dashboard.businessC,
      user: auth.user,
      selectedBranch: branchSelect.selectedBranch,
    }),
  );
  const [time, setTime] = useState(null);

  function getDashBoardList() {
    setTime(moment().format('YYYY-MM-DD HH:mm'));

    dispatch(
      getBusinessWDashboard({
        id: user.name,
        selectedBranch,
        state: 'W',
      }),
    );
    dispatch(
      getBusinessRDashboard({
        id: user.name,
        selectedBranch,
        state: 'R',
      }),
    );
    dispatch(
      getBusinessCDashboard({
        id: user.name,
        selectedBranch,
        state: 'C',
      }),
    );
  }
  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });

      getDashBoardList();
    }
  }, [dispatch, user]);

  const onRefresh = () => {
    getDashBoardList();
  };

  return (
    <BusinessDashboard
      time={time}
      businessW={businessW}
      businessR={businessR}
      businessC={businessC}
      onRefresh={onRefresh}
    ></BusinessDashboard>
  );
};

export default withRouter(BusinessDashboardContainer);
