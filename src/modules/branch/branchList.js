import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as branchAPI from '../../lib/api/branch/branchAPI';

const INITIALIZE_FORM = 'branchList/INITIALIZE_FORM';
const [
  BRANCH_LIST,
  BRANCH_LIST_SUCCESS,
  BRANCH_LIST_FAILURE,
] = createRequestActionTypes('branchList/BRANCH_LIST');
const [
  ADMIN_BRANCH_LIST,
  ADMIN_BRANCH_LIST_SUCCESS,
  ADMIN_BRANCH_LIST_FAILURE,
] = createRequestActionTypes('branchList/ADMIN_BRANCH_LIST');
const [
  BRANCH_CONFIRM,
  BRANCH_CONFIRM_SUCCESS,
  BRANCH_CONFIRM_FAILURE,
] = createRequestActionTypes('branchList/BRANCH_CONFIRM');
const [
  BRANCH_REJECT,
  BRANCH_REJECT_SUCCESS,
  BRANCH_REJECT_FAILURE,
] = createRequestActionTypes('branchList/BRANCH_REJECT');

export const initializeForm = createAction(INITIALIZE_FORM);
export const getBranchList = createAction(BRANCH_LIST, ({ name }) => ({
  name,
}));
export const getAdminBranchList = createAction(ADMIN_BRANCH_LIST);
export const confirmBranch = createAction(BRANCH_CONFIRM, ({ no }) => ({
  no,
}));
export const rejectBranch = createAction(BRANCH_REJECT, ({ no }) => ({
  no,
}));

const branchListSaga = createRequestSaga(BRANCH_LIST, branchAPI.getBranchList);
const adminBranchListSaga = createRequestSaga(
  ADMIN_BRANCH_LIST,
  branchAPI.getAdminBranchList,
);
const confirmBranchSaga = createRequestSaga(
  BRANCH_CONFIRM,
  branchAPI.confirmBranch,
);
const rejectBranchSaga = createRequestSaga(
  BRANCH_REJECT,
  branchAPI.rejectBranch,
);

export function* branchSaga() {
  yield takeLatest(BRANCH_LIST, branchListSaga);
  yield takeLatest(ADMIN_BRANCH_LIST, adminBranchListSaga);
  yield takeLatest(BRANCH_CONFIRM, confirmBranchSaga);
  yield takeLatest(BRANCH_REJECT, rejectBranchSaga);
}

const initialState = {
  branchs: null,
  branchResult: '',
  branchError: null,
};

const branchList = handleActions(
  {
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      branchs: null,
      branchResult: '',
      branchError: null,
    }),
    [BRANCH_LIST_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      branchs: data,
      branchError: null,
    }),
    [BRANCH_LIST_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      branchError: e,
    }),
    [ADMIN_BRANCH_LIST_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      branchs: data,
      branchError: null,
    }),
    [ADMIN_BRANCH_LIST_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      branchError: e,
    }),
    [BRANCH_CONFIRM_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      branchResult: code,
      branchError: null,
    }),
    [BRANCH_CONFIRM_FAILURE]: (state) => ({
      ...state,
      branchError: '승인',
    }),
    [BRANCH_REJECT_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      branchResult: code,
      branchError: null,
    }),
    [BRANCH_REJECT_FAILURE]: (state) => ({
      ...state,
      branchError: '거부',
    }),
  },
  initialState,
);

export default branchList;
