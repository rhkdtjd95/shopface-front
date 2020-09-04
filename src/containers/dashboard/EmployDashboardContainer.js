import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import EmployDashboard from '../../components/dashboard/EmployDashboard';
import { checkExpire } from '../../lib/api/common/authAPI';
import { logout } from '../../modules/common/auth';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmployWDashboard,
  getEmployRDashboard,
  getEmployCDashboard,
  putWorkTime,
  putQuitTime,
  initializeForm,
} from '../../modules/dashboard/dashboard';
const EmployDashboardContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    employW,
    employR,
    employC,
    loading,
    user,
    workResult,
    quitResult,
  } = useSelector(({ dashboard, loading, auth }) => ({
    employW: dashboard.employW,
    employR: dashboard.employR,
    employC: dashboard.employC,
    error: dashboard.error,
    loading: loading,
    user: auth.user,
    workResult: dashboard.workResult,
    quitResult: dashboard.quitResult,
  }));

  const onWork = (e) => {
    const no = e.target.value;

    dispatch(putWorkTime({ no }));
  };

  const onQuit = (e) => {
    const no = e.target.value;
    dispatch(putQuitTime({ no }));
  };

  useEffect(
    (e) => {
      if (user !== null) {
        checkExpire().then((isExpired) => {
          if (isExpired) {
            dispatch(logout());
          }
        });
        dispatch(
          getEmployRDashboard({
            id: user.name,
            state: 'R',
          }),
        );

        dispatch(
          getEmployWDashboard({
            id: user.name,
            state: 'W',
          }),
        );

        dispatch(
          getEmployCDashboard({
            id: user.name,
            state: 'C',
          }),
        );
      }
    },
    [dispatch, user],
  );

  // useEffect(() => {
  //   if (user !== null) {
  //     checkExpire().then((isExpired) => {
  //       if (isExpired) {
  //         dispatch(logout());
  //       }
  //     });
  //     dispatch(
  //       getEmployWDashboard({
  //         id: user.name,
  //         state: 'W',
  //       }),
  //     );
  //   }
  // }, [dispatch, user]);

  // useEffect(() => {
  //   if (user !== null) {
  //     checkExpire().then((isExpired) => {
  //       if (isExpired) {
  //         dispatch(logout());
  //       }
  //     });
  //     dispatch(
  //       getEmployCDashboard({
  //         id: user.name,
  //         state: 'C',
  //       }),
  //     );
  //   }
  // }, [dispatch, user]);

  useEffect(() => {
    if (workResult === 'OK') {
      alert('출근하셨습니다');
      dispatch(initializeForm());
      dispatch(
        getEmployRDashboard({
          id: user.name,
          state: 'R',
        }),
      );
    }
  }, [workResult, dispatch, user]);

  useEffect(() => {
    if (quitResult === 'OK') {
      alert('퇴근하셨습니다');
      dispatch(initializeForm());
      dispatch(
        getEmployRDashboard({
          id: user.name,
          state: 'R',
        }),
      );
    }
  }, [quitResult, dispatch, user]);

  return (
    <EmployDashboard
      employW={employW}
      employR={employR}
      employC={employC}
      loading={loading}
      onWork={onWork}
      onQuit={onQuit}
    ></EmployDashboard>
  );
};

export default withRouter(EmployDashboardContainer);
