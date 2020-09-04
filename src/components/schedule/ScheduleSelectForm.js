import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelect } from '../../modules/schedule/scheduleSelect';

const SelectBox = ({ schedules }) => {
  const dispatch = useDispatch();
  const { selectedSchedule } = useSelector(({ scheduleSelect }) => ({
    selectedSchedule: scheduleSelect.selectedSchedule,
  }));

  useEffect(() => {
    if (schedules != null && schedules.length > 0 && selectedSchedule === '') {
      dispatch(changeSelect(schedules[0].no));
    }
  }, [schedules, selectedSchedule, dispatch]);

  return <div></div>;
};

export default SelectBox;
