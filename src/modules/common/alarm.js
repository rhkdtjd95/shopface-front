import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import * as alarmAPI from '../../lib/api/common/alarmAPI';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const [
  ALARM_LIST,
  ALARM_LIST_SUCCESS,
  ALARM_LIST_FAILURE,
] = createRequestActionTypes('ALARM_LIST');
const [
  ALARM_DELETE,
  ALARM_DELETE_SUCCESS,
  ALARM_DELETE_FAILURE,
] = createRequestActionTypes('ALARM_DELETE');

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (initForm) => initForm,
);
export const alarmList = createAction(ALARM_LIST, ({ id }) => ({ id }));
export const alarmDelete = createAction(ALARM_DELETE, ({ no }) => ({ no }));

const alarmListSaga = createRequestSaga(ALARM_LIST, alarmAPI.getAlarmList);
const alarmDeleteSaga = createRequestSaga(ALARM_DELETE, alarmAPI.deleteAlarm);

export function* alarmSaga() {
  yield takeLatest(ALARM_LIST, alarmListSaga);
  yield takeLatest(ALARM_DELETE, alarmDeleteSaga);
}

const initialState = {
  alarms: null,
  alarmResult: null,
  alarmError: null,
};

const alarm = handleActions(
  {
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      alarmResult: null,
      alarmError: null,
    }),
    [ALARM_LIST_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      alarms: data,
    }),
    [ALARM_LIST_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      alarmError: e,
    }),
    [ALARM_DELETE_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      alarmResult: code,
    }),
    [ALARM_DELETE_FAILURE]: (state) => ({
      ...state,
      alarmError: '삭제',
    }),
  },
  initialState,
);

export default alarm;
