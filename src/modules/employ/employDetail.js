import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import * as employAPI from '../../lib/api/employ/employAPI';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

const CHANGE_INPUT = 'employDetail/CHANGE_INPUT';
const INITIALIZE_RESULT = 'employDetail/INITIALIZE_FORM';
const INITIALIZE_DISABLE = 'employDetail/INITIALIZE_DISABLE';
const INITIALIZE_INVITE = 'employDetail/INITIALIZE_INVITE';

const [
  EMPLOY_DETAIL,
  EMPLOY_DETAIL_SUCCESS,
  EMPLOY_DETAIL_FAILURE,
] = createRequestActionTypes('employDetail/EMPLOY_DETAIL');

const [
  EMPLOY_UPDATE,
  EMPLOY_UPDATE_SUCCESS,
  EMPLOY_UPDATE_FAILURE,
] = createRequestActionTypes('employDetail/EMPLOY_UPDATE');

const [
  EMPLOY_DISABLE,
  EMPLOY_DISABLE_SUCCESS,
  EMPLOY_DISABLE_FAILURE,
] = createRequestActionTypes('employDetail/EMPLOY_DISABLE');

const [
  EMPLOY_INVITE,
  EMPLOY_INVITE_SUCCESS,
  EMPLOY_INVITE_FAILURE,
] = createRequestActionTypes('employDetail/EMPLOY_INVITE');

export const changeInput = createAction(CHANGE_INPUT, ({ key, value }) => ({
  key,
  value,
}));
export const initializeResult = createAction(INITIALIZE_RESULT);
export const initializeDisable = createAction(INITIALIZE_DISABLE);
export const initializeInvite = createAction(INITIALIZE_INVITE);

export const getEmployDetail = createAction(EMPLOY_DETAIL, ({ no }) => ({
  no,
}));
export const employUpdate = createAction(EMPLOY_UPDATE, ({ no, data }) => ({
  no,
  data,
}));
export const employDisable = createAction(EMPLOY_DISABLE, ({ no }) => ({
  no,
}));
export const employInvite = createAction(EMPLOY_INVITE, ({ no }) => ({
  no,
}));

export const getEmploySaga = createRequestSaga(
  EMPLOY_DETAIL,
  employAPI.getEmploy,
);
export const employUpdateSaga = createRequestSaga(
  EMPLOY_UPDATE,
  employAPI.updateEmploy,
);
export const employhDisableSaga = createRequestSaga(
  EMPLOY_DISABLE,
  employAPI.disableEmploy,
);
export const employInviteSaga = createRequestSaga(
  EMPLOY_INVITE,
  employAPI.inviteEmploy,
);

export function* employDetailSaga() {
  yield takeLatest(EMPLOY_DETAIL, getEmploySaga);
  yield takeLatest(EMPLOY_UPDATE, employUpdateSaga);
  yield takeLatest(EMPLOY_DISABLE, employhDisableSaga);
  yield takeLatest(EMPLOY_INVITE, employInviteSaga);
}

const initialState = {
  employ: null,
  employResult: null,
  disableResult: null,
  inviteResult: null,
  employError: null,
};
export const employDetail = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft['employ'][key] = value;
      }),
    [INITIALIZE_RESULT]: (state) => ({
      ...state,
      employResult: null,
      employError: null,
    }),

    [INITIALIZE_DISABLE]: (state) => ({
      ...state,
      disableResult: null,
      employError: null,
    }),
    [INITIALIZE_INVITE]: (state) => ({
      ...state,
      inviteResult: null,
      employError: null,
    }),
    [EMPLOY_DETAIL_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      employ: data,
      employResult: null,
      employError: null,
    }),
    [EMPLOY_DETAIL_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      employError: message,
    }),
    [EMPLOY_UPDATE_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      employResult: code,
      employError: null,
    }),
    [EMPLOY_UPDATE_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      employResult: null,
      employError: message,
    }),
    [EMPLOY_DISABLE_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      disableResult: code,
      employError: null,
    }),
    [EMPLOY_DISABLE_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      disableResult: null,
      employError: message,
    }),

    [EMPLOY_INVITE_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      inviteResult: code,
      employError: null,
    }),
    [EMPLOY_INVITE_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      inviteResult: null,
      employError: message,
    }),
  },
  initialState,
);

export default employDetail;
