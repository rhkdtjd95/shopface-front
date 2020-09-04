import React, { useEffect, useState } from 'react';
import AlarmForm from '../../components/common/AlarmForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  initializeForm,
  alarmList,
  alarmDelete,
} from '../../modules/common/alarm';

const AlarmContainer = () => {
  const dispatch = useDispatch();
  const { user, alarms, alarmResult, alarmError } = useSelector(
    ({ auth, alarm }) => ({
      user: auth.user,
      alarms: alarm.alarms,
      alarmResult: alarm.alarmResult,
      alarmError: alarm.alarmError,
    }),
  );

  const [formAlarm, setFormAlarm] = useState(null);

  function changeContentType({ type }) {
    switch (type) {
      case 'ABSENTEEISM_SCHEDULE':
        return '근무자 결근';
      case 'JOIN_EMPLOYEE':
        return '근무자 합류';
      case 'ADD_SCHEDULE':
        return '스케줄 등록';
      case 'REMOVE_SCHEDULE':
        return '스케줄 삭제';
      case 'UPDATE_SCHEDULE':
        return '스케줄 변경';
      case 'REJECTED_BRANCH':
        return '사업장 승인 거부';
      case 'CONFIRMED_BRANCH':
        return '사업장 승인';
      case 'COMMUTE_SUCCESS':
        return '출퇴근 인증 성공';
      case 'COMMUTE_FAIL':
        return '출퇴근 인증 실패';
      default:
        console.log('해당없음');
    }
  }
  function changeFormData({ alarms }) {
    const changeAlarms = alarms.map((alarm) => ({
      no: alarm.no,
      title: changeContentType({ type: alarm.type }),
      contents: alarm.contents.split('. '),
      registerDate: alarm.registerDate.substring(
        0,
        alarm.registerDate.indexOf(' '),
      ),
    }));

    return changeAlarms;
  }

  const onDelete = (e) => {
    const no = e.target.getAttribute('no');
    dispatch(alarmDelete({ no }));
  };

  useEffect(() => {
    if (alarms !== null) {
      if (alarms.length > 0) {
        setFormAlarm(changeFormData({ alarms }));
      } else {
        setFormAlarm(null);
      }
    }
  }, [alarms]);

  useEffect(() => {
    if (user !== null) {
      dispatch(alarmList({ id: user.name }));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (alarmResult === 'OK') {
      dispatch(initializeForm());
      dispatch(alarmList({ id: user.name }));
    }
  }, [alarmResult, dispatch, user]);

  useEffect(() => {
    if (alarmError !== null) {
      if (alarmError === '삭제') {
        alert('알람을 삭제 하지 못했습니다.');
        dispatch(initializeForm());

        return;
      }
      alert('오류가 발생했습니다.');
    }
  }, [alarmError, dispatch]);

  return <AlarmForm formAlarm={formAlarm} onDelete={onDelete} />;
};

export default AlarmContainer;
