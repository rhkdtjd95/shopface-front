import React, { useState, useEffect } from 'react';
import { SchedulerData, ViewTypes, DATE_FORMAT } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import DragDropContext from './DndContext';
import { withRouter } from 'react-router-dom';
import ScheduleListForm from '../../components/schedule/ScheduleListForm';
import { useSelector, useDispatch } from 'react-redux';
import { checkExpire } from '../../lib/api/common/authAPI';
import { getEmployScheduleList } from '../../modules/schedule/scheduleList';
import { logout } from '../../modules/common/auth';

const EmployScheduleContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user, employSchedules, scheduleError } = useSelector(
    ({ auth, scheduleList }) => ({
      user: auth.user,
      employSchedules: scheduleList.employSchedules,
      scheduleError: scheduleList.scheduleError,
    }),
  );

  moment.locale('en');
  const [schedulerData, setSchedulerData] = useState(
    new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week),
  );
  schedulerData.config.schedulerWidth = '80%';
  const [employEvents, setEmployEvents] = useState(null);

  const prevClick = (data) => {
    data.prev();
    data.setEvents(employEvents);

    setSchedulerData(data);

    history.push('/schedule');
  };

  const nextClick = (data) => {
    data.next();
    data.setEvents(employEvents);

    setSchedulerData(data);

    history.push('/schedule');
  };

  const onViewChange = (data, view) => {
    data.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    data.setEvents(employEvents);

    setSchedulerData(data);

    history.push('/schedule');
  };

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(employEvents);

    setSchedulerData(schedulerData);

    history.push('/schedule');
  };

  const onScrollRight = (data, schedulerContent, maxScrollLeft) => {
    if (data.ViewTypes === ViewTypes.Day) {
      data.next();
      data.setEvents(employEvents);
      setSchedulerData(data);

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  const onScrollLeft = (data, schedulerContent, maxScrollLeft) => {
    if (data.ViewTypes === ViewTypes.Day) {
      data.prev();
      setSchedulerData(data);

      schedulerContent.scrollLeft = 10;
    }
  };

  const nonAgendaCellHeaderTemplateResolver = (
    data,
    item,
    formattedDateItems,
    style,
  ) => {
    let datetime = data.localeMoment(item.time);
    let isCurrentDate = false;

    if (data.viewType === ViewTypes.Day) {
      isCurrentDate = datetime.isSame(new Date(), 'hour');
    } else {
      isCurrentDate = datetime.isSame(new Date(), 'day');
    }

    if (isCurrentDate) {
      style.backgroundColor = '#118dea';
      style.color = 'white';
    }
    return (
      <th key={item.time} className={`header3-text`} style={style}>
        {formattedDateItems.map((formattedItem, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{
              __html: formattedItem.replace(/[0-9]/g, '<b>$&</b>'),
            }}
          />
        ))}
      </th>
    );
  };

  useEffect(() => {
    if (employSchedules !== null) {
      const branchResources = employSchedules.map((branch) => ({
        id: branch.branchNo,
        name: branch.branchName,
      }));

      const distinctResoures = Array.from(
        new Set(branchResources.map((s) => s.id)),
      ).map((id) => {
        return {
          id: id,
          name: branchResources.find((s) => s.id === id).name,
        };
      });
      schedulerData.setResources(distinctResoures);

      const scheduleEvents = employSchedules.map((schedule) => ({
        id: schedule.no,
        start: schedule.workStartTime,
        end: schedule.workEndTime,
        resourceId: schedule.branchNo,
        title:
          new Date(schedule.workStartTime).getHours() +
          '~' +
          new Date(schedule.workEndTime).getHours() +
          ' ' +
          schedule.occupationName,
        bgColor: schedule.color,
      }));

      setEmployEvents(scheduleEvents);
      schedulerData.setEvents(scheduleEvents);
    } else {
      setEmployEvents(null);

      schedulerData.setResources([]);
      schedulerData.setEvents([]);
    }
  }, [schedulerData, employSchedules]);

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });

      dispatch(getEmployScheduleList({ id: user.name }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (scheduleError !== null) {
      if (scheduleError === undefined) {
        alert(`오류가 발생했습니다.`);
      } else {
        alert(`시간표 ${scheduleError}을 실패 했습니다.`);
      }

      setEmployEvents(null);

      dispatch(getEmployScheduleList({ id: user.name }));
    }
  }, [scheduleError, dispatch, user.name]);

  return (
    <ScheduleListForm
      schedulerData={schedulerData}
      prevClick={prevClick}
      nextClick={nextClick}
      onViewChange={onViewChange}
      onSelectDate={onSelectDate}
      onScrollLeft={onScrollLeft}
      onScrollRight={onScrollRight}
      nonAgendaCellHeaderTemplateResolver={nonAgendaCellHeaderTemplateResolver}
    />
  );
};

export default DragDropContext(withRouter(EmployScheduleContainer));
