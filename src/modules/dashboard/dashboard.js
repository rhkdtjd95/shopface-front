import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as dashboardAPI from '../../lib/api/dashboard/dashboardAPI';
const [
  EMPLOY_WDASHBOARD,
  EMPLOY_WDASHBOARD_SUCCESS,
  EMPLOY_WDASHBOARD_FAILURE,
] = createRequestActionTypes('dashboard/EMPLOY_WDASHBOARD');

const [
  EMPLOY_RDASHBOARD,
  EMPLOY_RDASHBOARD_SUCCESS,
  EMPLOY_RDASHBOARD_FAILURE,
] = createRequestActionTypes('dashboard/EMPLOY_RDASHBOARD');

const [
  EMPLOY_CDASHBOARD,
  EMPLOY_CDASHBOARD_SUCCESS,
  EMPLOY_CDASHBOARD_FAILURE,
] = createRequestActionTypes('dashboard/EMPLOY_CDASHBOARD');

const [
  EMPLOY_PUTWORKTIME,
  EMPLOY_PUTWORKTIME_SUCCESS,
  EMPLOY_PUTWORKTIME_FAILURE,
] = createRequestActionTypes('dashboard/EMPLOY_PUTWORKTIME');

const [
  EMPLOY_PUTQUITTIME,
  EMPLOY_PUTQUITTIME_SUCCESS,
  EMPLOY_PUTQUITTIME_FAILURE,
] = createRequestActionTypes('dashboard/EMPLOY_PUTQUITTIME');
const [
  BUSINESS_WDASHBOARD,
  BUSINESS_WDASHBOARD_SUCCESS,
  BUSINESS_WDASHBOARD_FAILURE,
] = createRequestActionTypes('dashboard/BUSINESS_WDASHBOARD');
const [
  BUSINESS_RDASHBOARD,
  BUSINESS_RDASHBOARD_SUCCESS,
  BUSINESS_RDASHBOARD_FAILURE,
] = createRequestActionTypes('dashboard/BUSINESS_RDASHBOARD');
const [
  BUSINESS_CDASHBOARD,
  BUSINESS_CDASHBOARD_SUCCESS,
  BUSINESS_CDASHBOARD_FAILURE,
] = createRequestActionTypes('dashboard/BUSINESS_CDASHBOARD');
const INITIALIZE_FORM = 'dashboard/INITIALIZE_FORM';
export const getEmployWDashboard = createAction(
  EMPLOY_WDASHBOARD,
  (id) => id,
  (state) => state,
);

export const getEmployRDashboard = createAction(
  EMPLOY_RDASHBOARD,
  (id) => id,
  (state) => state,
);

export const getEmployCDashboard = createAction(
  EMPLOY_CDASHBOARD,
  (id) => id,
  (state) => state,
);
export const getBusinessWDashboard = createAction(
  BUSINESS_WDASHBOARD,
  (selectedBranch) => selectedBranch,
  (id) => id,
  (state) => state,
);
export const getBusinessRDashboard = createAction(
  BUSINESS_RDASHBOARD,
  (selectedBranch) => selectedBranch,
  (id) => id,
  (state) => state,
);
export const getBusinessCDashboard = createAction(
  BUSINESS_CDASHBOARD,
  (selectedBranch) => selectedBranch,
  (id) => id,
  (state) => state,
);

export const putWorkTime = createAction(EMPLOY_PUTWORKTIME, ({ no }) => ({
  no,
}));

export const putQuitTime = createAction(EMPLOY_PUTQUITTIME, ({ no }) => ({
  no,
}));
const employWSaga = createRequestSaga(
  EMPLOY_WDASHBOARD,
  dashboardAPI.getEmployWDashboard,
);

const employRSaga = createRequestSaga(
  EMPLOY_RDASHBOARD,
  dashboardAPI.getEmployRDashboard,
);
const employCSaga = createRequestSaga(
  EMPLOY_CDASHBOARD,
  dashboardAPI.getEmployCDashboard,
);
const businessWSaga = createRequestSaga(
  BUSINESS_WDASHBOARD,
  dashboardAPI.getBusinessWDashboard,
);
const businessRSaga = createRequestSaga(
  BUSINESS_RDASHBOARD,
  dashboardAPI.getBusinessRDashboard,
);
const businessCSaga = createRequestSaga(
  BUSINESS_CDASHBOARD,
  dashboardAPI.getBusinessCDashboard,
);
const workSaga = createRequestSaga(
  EMPLOY_PUTWORKTIME,
  dashboardAPI.putWorkTime,
);

const quitSaga = createRequestSaga(
  EMPLOY_PUTQUITTIME,
  dashboardAPI.putQuitTime,
);

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (initForm) => initForm,
);

export function* dashboardSaga() {
  yield takeLatest(BUSINESS_WDASHBOARD, businessWSaga);
  yield takeLatest(BUSINESS_RDASHBOARD, businessRSaga);
  yield takeLatest(BUSINESS_CDASHBOARD, businessCSaga);
  yield takeLatest(EMPLOY_WDASHBOARD, employWSaga);
  yield takeLatest(EMPLOY_RDASHBOARD, employRSaga);
  yield takeLatest(EMPLOY_CDASHBOARD, employCSaga);
  yield takeLatest(EMPLOY_PUTWORKTIME, workSaga);
  yield takeLatest(EMPLOY_PUTQUITTIME, quitSaga);
}

const initialState = {
  employW: null,
  employR: null,
  employC: null,
  businessW: null,
  businessR: null,
  businessC: null,
  workResult: null,
  quitResult: null,
  error: null,
  dashboardList: {
    branchName: '',
    occupationName: '',
    state: '',
    scheduleNo: '',
    actualSalary: '',
    actualWorkingHours: '',
    employSalary: '',
    hoursplan: '',
    salaryPlan: '',
    workEndTime: '',
    workStartTime: '',
    workingTime: '',
  },
};

const dashboard = handleActions(
  {
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      dashboardList: initialState,
      dashboardResult: null,
    }),
    [BUSINESS_WDASHBOARD_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      businessW: data,
      error: null,
    }),
    [BUSINESS_WDASHBOARD_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      error: e,
    }),
    [BUSINESS_RDASHBOARD_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      businessR: data,
      error: null,
    }),
    [BUSINESS_RDASHBOARD_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      error: e,
    }),
    [BUSINESS_CDASHBOARD_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      businessC: data,
      error: null,
    }),
    [BUSINESS_CDASHBOARD_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      error: e,
    }),

    [EMPLOY_WDASHBOARD_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      employW: data,
      error: null,
    }),
    [EMPLOY_WDASHBOARD_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      error: e,
    }),
    [EMPLOY_RDASHBOARD_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      employR: data,
      error: null,
    }),
    [EMPLOY_RDASHBOARD_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      error: e,
    }),
    [EMPLOY_CDASHBOARD_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      employC: data,
      error: null,
    }),
    [EMPLOY_CDASHBOARD_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      error: e,
    }),
    [EMPLOY_PUTWORKTIME_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      workResult: code,
      error: null,
    }),
    [EMPLOY_PUTWORKTIME_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      workResult: null,
      error: message,
    }),
    [EMPLOY_PUTQUITTIME_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      quitResult: code,
      error: null,
    }),
    [EMPLOY_PUTQUITTIME_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      quitResult: null,
      error: message,
    }),
  },
  initialState,
);

export default dashboard;
