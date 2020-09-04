import React, { useState, useEffect } from 'react';
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
} from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import DragDropContext from './DndContext';
import { withRouter } from 'react-router-dom';
import ScheduleListForm from '../../components/schedule/ScheduleListForm';
import SchedulerModalForm from '../../components/schedule/SchedulerModalForm'; //ToDo lazy 사용
import { useSelector, useDispatch } from 'react-redux';
import { checkExpire } from '../../lib/api/common/authAPI';
import {
  getScheduleList,
  changeInput,
  initializeForm,
  postSchedule,
  changeScheduleUpdate,
  changeUpdate,
  updateSchedule,
  deleteSchedule,
} from '../../modules/schedule/scheduleList';
import { getOccupationList } from '../../modules/occupation/occupation';
import { logout } from '../../modules/common/auth';
import { getEmployList } from '../../modules/employ/employList';

const ScheduleListContainer = ({ history }) => {
  moment.locale('en');
  const dispatch = useDispatch();
  const {
    user,
    schedules,
    schedulePost,
    scheduleUpdate,
    scheduleResult,
    scheduleError,
    occupations,
    employs,
    selectedBranch,
  } = useSelector(
    ({ auth, scheduleList, occupation, employList, branchSelect }) => ({
      user: auth.user,
      schedules: scheduleList.schedules,
      schedulePost: scheduleList.post,
      scheduleUpdate: scheduleList.update,
      scheduleResult: scheduleList.scheduleResult,
      scheduleError: scheduleList.scheduleError,
      occupations: occupation.occupations,
      employs: employList.employs,
      selectedBranch: branchSelect.selectedBranch,
    }),
  );

  const [schedulerData, setSchedulerData] = useState(
    new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week),
  );
  schedulerData.config.schedulerWidth = '80%';

  const [scheduleEvent, setScheduleEvent] = useState(null);
  const [filterEvents, setFilterEvents] = useState(null);
  const [targetTime, setTargetTime] = useState(null);
  const [modalType, setModalType] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const closeModal = () => {
    setShow(false);
    setError('');
  };
  const openModal = () => {
    setShow(true);
  };

  const prevClick = (data) => {
    data.prev();
    data.setEvents(filterEvents);

    setSchedulerData(data);

    history.push('/schedule');
  };

  const nextClick = (data) => {
    data.next();
    data.setEvents(filterEvents);

    setSchedulerData(data);

    history.push('/schedule');
  };

  const onViewChange = (data, view) => {
    data.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    data.setEvents(filterEvents);

    setSchedulerData(data);

    history.push('/schedule');
  };

  const newEvent = (
    schedulerData,
    slotId,
    slotName,
    start,
    end,
    type,
    item,
  ) => {
    setTargetTime(start);

    const today = new moment().format(DATE_FORMAT);
    if (start < today) {
      alert('시간표를 등록할 수 없습니다.');

      return;
    }
    setModalType('post');
    openModal();
  };

  const eventClicked = (data, event) => {
    const occupationName = event.title.substring(event.title.indexOf(' ') + 1);
    const filterOccupation = occupations.filter(
      (occupation) => occupation.name === occupationName,
    );
    event.occupationNo = filterOccupation[0].no;

    const selectedSchedule = {
      employNo: event.resourceId,
      workStartTime: event.start,
      workEndTime: event.end,
      occupationNo: event.occupationNo,
      color: event.bgColor,
    };
    dispatch(changeScheduleUpdate({ selectedSchedule }));

    setTargetTime(event.start);
    setScheduleEvent(event);
    setModalType('update');

    openModal();
  };

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(filterEvents);

    setSchedulerData(schedulerData);

    history.push('/schedule');
  };

  const onScrollRight = (data, schedulerContent, maxScrollLeft) => {
    if (data.ViewTypes === ViewTypes.Day) {
      data.next();
      data.setEvents(filterEvents);
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

  const toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    setSchedulerData(schedulerData);
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

  const onChange = (e) => {
    setError('');

    const { name, value } = e.target;
    if (modalType === 'update') {
      let changeEvent = scheduleEvent;
      if (name === 'occupationNo') {
        changeEvent['occupationNo'] = value;
      }
      if (name === 'color') {
        changeEvent['bgColor'] = value;
      }

      setScheduleEvent(changeEvent);
      dispatch(changeUpdate({ key: name, value }));

      return;
    }

    dispatch(changeInput({ key: name, value }));
  };

  const onTimeChange = (time, timeString) => {
    setError('');

    if (time !== null) {
      const startTime = timeString[0];
      const today = new Date().getDate();
      const clickDate = new Date(targetTime).getDate();

      if (startTime < moment().format('HH:mm') && today === clickDate) {
        setError('시간을 다시 선택해주세요');
        return;
      }

      if (modalType === 'update') {
        dispatch(
          changeUpdate({
            key: 'workStartTime',
            value:
              targetTime.substring(0, targetTime.indexOf(' ') + 1) +
              time[0].format('HH:mm:ss'),
          }),
        );
        dispatch(
          changeUpdate({
            key: 'workEndTime',
            value:
              targetTime.substring(0, targetTime.indexOf(' ') + 1) +
              time[1].format('HH:mm:ss'),
          }),
        );

        return;
      }

      dispatch(
        changeInput({
          key: 'workStartTime',
          value:
            targetTime.substring(0, targetTime.indexOf(' ')) +
            ' ' +
            time[0].format('HH:mm:ss'),
        }),
      );
      dispatch(
        changeInput({
          key: 'workEndTime',
          value:
            targetTime.substring(0, targetTime.indexOf(' ')) +
            ' ' +
            time[1].format('HH:mm:ss'),
        }),
      );
    }
  };

  const onScheduleSubmit = () => {
    let data = null;
    if (modalType === 'post') {
      data = schedulePost;
    } else {
      data = scheduleUpdate;
    }

    if (
      [
        data.employNo,
        data.workStartTime,
        data.workEndTime,
        data.occupationNo,
        data.color,
      ].includes('') ||
      [data.employNo, data.occupationNo].includes('x')
    ) {
      setError('값을 모두 선택해주세요');
      return;
    }

    if (modalType === 'post') {
      dispatch(postSchedule({ data }));
      return;
    }
    dispatch(updateSchedule({ no: scheduleEvent.id, data }));
  };

  const onScheduleDelete = () => {
    dispatch(deleteSchedule({ no: scheduleEvent.id }));
  };

  useEffect(() => {
    if (employs !== null) {
      const filterEmploys = employs.filter((employ) => employ.state === 'E');
      const employResources = filterEmploys.map((employ) => ({
        id: employ.no,
        name: employ.name,
      }));

      schedulerData.setResources(employResources);
    } else {
      schedulerData.setResources([]);
    }

    if (schedules !== null) {
      const scheduleEvents = schedules.map((schedule) => ({
        id: schedule.no,
        start: schedule.workStartTime,
        end: schedule.workEndTime,
        resourceId: schedule.employNo,
        title:
          new Date(schedule.workStartTime).getHours() +
          '~' +
          new Date(schedule.workEndTime).getHours() +
          ' ' +
          schedule.occupationName,
        bgColor: schedule.color,
      }));

      setFilterEvents(scheduleEvents);
      schedulerData.setEvents(scheduleEvents);
    } else {
      setFilterEvents(null);
      schedulerData.setEvents([]);
    }
  }, [schedulerData, schedules, employs]);

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });
      if (selectedBranch === '') {
        alert('사업장을 등록해주세요');
        history.push('/branch');

        return;
      }

      dispatch(getScheduleList({ no: selectedBranch }));
      dispatch(getEmployList({ selectedBranch }));
      dispatch(getOccupationList({ selectedBranch }));
    }
  }, [dispatch, selectedBranch, user]);

  useEffect(() => {
    if (scheduleResult === 'OK') {
      alert('시간표가 변경 되었습니다.');

      dispatch(initializeForm());
      dispatch(getScheduleList({ no: selectedBranch }));

      closeModal();
    }
  }, [scheduleResult, dispatch, selectedBranch]);

  useEffect(() => {
    if (scheduleError !== null) {
      if (scheduleError === undefined) {
        alert('오류가 발생했습니다.');

        return;
      }
      alert(`시간표 ${scheduleError}을 실패 했습니다.`);

      setScheduleEvent(null);
      setModalType('');

      dispatch(initializeForm());
      dispatch(getScheduleList({ no: selectedBranch }));

      closeModal();
    }
  }, [scheduleError, dispatch, selectedBranch]);

  useEffect(() => {
    return () => closeModal();
  }, []);

  return (
    <>
      <ScheduleListForm
        schedulerData={schedulerData}
        prevClick={prevClick}
        nextClick={nextClick}
        onViewChange={onViewChange}
        eventItemClick={eventClicked}
        newEvent={newEvent}
        onSelectDate={onSelectDate}
        onScrollLeft={onScrollLeft}
        onScrollRight={onScrollRight}
        toggleExpandFunc={toggleExpandFunc}
        nonAgendaCellHeaderTemplateResolver={
          nonAgendaCellHeaderTemplateResolver
        }
      />
      <SchedulerModalForm
        schedule={scheduleEvent}
        occupations={occupations}
        show={show}
        closeModal={closeModal}
        employs={employs}
        modalType={modalType}
        onChange={onChange}
        onTimeChange={onTimeChange}
        onScheduleSubmit={onScheduleSubmit}
        onScheduleDelete={onScheduleDelete}
        error={error}
      />
    </>
  );
};

export default DragDropContext(withRouter(ScheduleListContainer));
