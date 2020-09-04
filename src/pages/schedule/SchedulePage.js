import React from 'react';
import BusinessScheduleContainer from '../../containers/schedule/BusinessScheduleContainer';
import EmployScheduleContainer from '../../containers/schedule/EmployScheduleContainer';
import { useSelector } from 'react-redux';
const SchedulePage = () => {
  const { user } = useSelector(({ auth }) => ({ user: auth.user }));
  return (
    <div>
      {user !== null ? (
        user.type === 'B' ? (
          <BusinessScheduleContainer />
        ) : (
          <EmployScheduleContainer />
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default SchedulePage;
