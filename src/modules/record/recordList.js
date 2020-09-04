import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as recordAPI from '../../lib/api/record/recordAPI';

const [
  EMPLOY_RECORD_LIST,
  EMPLOY_RECORD_LIST_SUCCESS,
  EMPLOY_RECORD_LIST_FAILURE,
] = createRequestActionTypes('recordList/EMPLOY_RECORD_LIST');

const [
  BUSINESS_RECORD_LIST,
  BUSINESS_RECORD_LIST_SUCCESS,
  BUSINESS_RECORD_LIST_FAILURE,
] = createRequestActionTypes('recordList/BUSINESS_RECORD_LIST');

export const getEmployRecordList = createAction(EMPLOY_RECORD_LIST, (id) => id);
export const getBusinessRecordList = createAction(
  BUSINESS_RECORD_LIST,
  (selectedBranch) => selectedBranch,
);
const employRecordSaga = createRequestSaga(
  EMPLOY_RECORD_LIST,
  recordAPI.getEmployRecordList,
);
const businessRecordSaga = createRequestSaga(
  BUSINESS_RECORD_LIST,
  recordAPI.getBusinessRecordList,
);
export function* recordSaga() {
  yield takeLatest(EMPLOY_RECORD_LIST, employRecordSaga);
  yield takeLatest(BUSINESS_RECORD_LIST, businessRecordSaga);
}

const initialState = {
  employRecords: null,
  businessRecords: null,
  recordError: null,
};

const recordList = handleActions(
  {
    [EMPLOY_RECORD_LIST_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      employRecords: data,
      recordError: null,
    }),
    [EMPLOY_RECORD_LIST_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      recordError: e,
    }),

    [BUSINESS_RECORD_LIST_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      businessRecords: data,
      recordError: null,
    }),
    [BUSINESS_RECORD_LIST_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      recordError: e,
    }),
  },
  initialState,
);

export default recordList;
