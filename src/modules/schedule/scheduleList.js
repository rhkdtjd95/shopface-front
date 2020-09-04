import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as scheduleAPI from '../../lib/api/schedule/scheduleAPI';
import { produce } from 'immer';

const CHANGE_INPUT = 'scheduleList/CHANGE_INPUT';
const CHANGE_UPDATE = 'scheduleList/CHANGE_UPDATE';
const CHANGE_SCHEDULE_UPDATE_ = 'scheduleList/CHANGE_SCHEDULE_UPDATE_';
const INITIALIZE_FORM = 'scheduleList/INITIALIZE_FORM';

const [
  SCHEDULE_LIST,
  SCHEDULE_LIST_SUCCESS,
  SCHEDULE_LIST_FAILURE,
] = createRequestActionTypes('scheduleList/schedule_LIST');
const [
  EMPLOY_SCHEDULE_LIST,
  EMPLOY_SCHEDULE_LIST_SUCCESS,
  EMPLOY_SCHEDULE_LIST_FAILURE,
] = createRequestActionTypes('scheduleList/EMPLOY_SCHEDULE_LIST');
const [
  SCHEDULE_POST,
  SCHEDULE_POST_SUCCESS,
  SCHEDULE_POST_FAILURE,
] = createRequestActionTypes('scheduleList/SCHEDULE_POST');
const [
  SCHEDULE_UPDATE,
  SCHEDULE_UPDATE_SUCCESS,
  SCHEDULE_UPDATE_FAILURE,
] = createRequestActionTypes('scheduleList/SCHEDULE_UPDATE');
const [
  SCHEDULE_DELETE,
  SCHEDULE_DELETE_SUCCESS,
  SCHEDULE_DELETE_FAILURE,
] = createRequestActionTypes('scheduleList/SCHEDULE_DELETE');

export const changeInput = createAction(CHANGE_INPUT, ({ key, value }) => ({
  key,
  value,
}));
export const changeUpdate = createAction(CHANGE_UPDATE, ({ key, value }) => ({
  key,
  value,
}));
export const changeScheduleUpdate = createAction(
  CHANGE_SCHEDULE_UPDATE_,
  ({ selectedSchedule }) => ({
    selectedSchedule,
  }),
);
export const initializeForm = createAction(
  INITIALIZE_FORM,
  (initForm) => initForm,
);

export const getScheduleList = createAction(SCHEDULE_LIST, ({ no }) => ({
  no,
}));
export const getEmployScheduleList = createAction(
  EMPLOY_SCHEDULE_LIST,
  ({ id }) => ({
    id,
  }),
);
export const postSchedule = createAction(SCHEDULE_POST, ({ data }) => ({
  data,
}));
export const updateSchedule = createAction(SCHEDULE_UPDATE, ({ no, data }) => ({
  no,
  data,
}));
export const deleteSchedule = createAction(SCHEDULE_DELETE, ({ no }) => ({
  no,
}));

const getScheduleListSaga = createRequestSaga(
  SCHEDULE_LIST,
  scheduleAPI.getScheduleList,
);
const getEmployScheduleListSaga = createRequestSaga(
  EMPLOY_SCHEDULE_LIST,
  scheduleAPI.getEmployScheduleList,
);
const postScheduleSaga = createRequestSaga(
  SCHEDULE_POST,
  scheduleAPI.postSchedule,
);
const updateScheduleSaga = createRequestSaga(
  SCHEDULE_UPDATE,
  scheduleAPI.updateSchedule,
);
const deleteScheduleSaga = createRequestSaga(
  SCHEDULE_DELETE,
  scheduleAPI.deleteSchedule,
);

export function* scheduleSaga() {
  yield takeLatest(SCHEDULE_LIST, getScheduleListSaga);
  yield takeLatest(EMPLOY_SCHEDULE_LIST, getEmployScheduleListSaga);
  yield takeLatest(SCHEDULE_POST, postScheduleSaga);
  yield takeLatest(SCHEDULE_UPDATE, updateScheduleSaga);
  yield takeLatest(SCHEDULE_DELETE, deleteScheduleSaga);
}

const initialState = {
  schedules: null,
  employSchedules: null,
  scheduleError: null,
  post: {
    employNo: '',
    workStartTime: '',
    workEndTime: '',
    occupationNo: '',
    color: '#080808',
  },
  update: {
    employNo: '',
    workStartTime: '',
    workEndTime: '',
    occupationNo: '',
    color: '',
  },
  scheduleResult: '',
};

const scheduleList = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft['post'][key] = value;
      }),
    [CHANGE_UPDATE]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft['update'][key] = value;
      }),
    [CHANGE_SCHEDULE_UPDATE_]: (state, { payload: { selectedSchedule } }) => ({
      ...state,
      update: selectedSchedule,
    }),
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      post: initialState['post'],
      update: initialState['update'],
      scheduleResult: '',
      scheduleError: null,
    }),
    [SCHEDULE_LIST_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      schedules: data,
      scheduleError: null,
    }),
    [SCHEDULE_LIST_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      scheduleError: e,
    }),
    [EMPLOY_SCHEDULE_LIST_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      employSchedules: data,
      scheduleError: null,
    }),
    [EMPLOY_SCHEDULE_LIST_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      scheduleError: e,
    }),
    [SCHEDULE_POST_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      scheduleResult: code,
      scheduleError: null,
    }),
    [SCHEDULE_POST_FAILURE]: (state) => ({
      ...state,
      scheduleError: '등록',
    }),
    [SCHEDULE_UPDATE_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      scheduleResult: code,
      scheduleError: null,
    }),
    [SCHEDULE_UPDATE_FAILURE]: (state) => ({
      ...state,
      scheduleError: '수정',
    }),
    [SCHEDULE_DELETE_SUCCESS]: (state) => ({
      ...state,
      scheduleResult: 'OK',
      scheduleError: null,
    }),
    [SCHEDULE_DELETE_FAILURE]: (state) => ({
      ...state,
      scheduleError: '삭제',
    }),
  },
  initialState,
);

export default scheduleList;
