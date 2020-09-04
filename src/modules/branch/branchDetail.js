import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import * as branchAPI from '../../lib/api/branch/branchAPI';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

const CHANGE_INPUT = 'branchDetail/CHANGE_INPUT';
const INITIALIZE_RESULT = 'branchDetail/INITIALIZE_FORM';

const [
  BRANCH_DETAIL,
  BRANCH_DETAIL_SUCCESS,
  BRANCH_DETAIL_FAILURE,
] = createRequestActionTypes('branchDetail/BRANCH_DETAIL');

const [
  BRANCH_UPDATE,
  BRANCH_UPDATE_SUCCESS,
  BRANCH_UPDATE_FAILURE,
] = createRequestActionTypes('branchDetail/BRANCH_UPDATE');

const [
  BRANCH_DELETE,
  BRANCH_DELETE_SUCCESS,
  BRANCH_DELETE_FAILURE,
] = createRequestActionTypes('branchDetail/BRANCH_DELETE');

export const changeInput = createAction(CHANGE_INPUT, ({ key, value }) => ({
  key,
  value,
}));
export const initializeResult = createAction(INITIALIZE_RESULT);

export const getbranchDetail = createAction(BRANCH_DETAIL, ({ no }) => ({
  no,
}));
export const branchUpdate = createAction(BRANCH_UPDATE, ({ no, data }) => ({
  no,
  data,
}));
export const branchDelete = createAction(BRANCH_DELETE, ({ no }) => ({
  no,
}));

export const getBranchSaga = createRequestSaga(
  BRANCH_DETAIL,
  branchAPI.getBranch,
);
export const branchUpdateSaga = createRequestSaga(
  BRANCH_UPDATE,
  branchAPI.putBranch,
);
export const branchDeleteSaga = createRequestSaga(
  BRANCH_DELETE,
  branchAPI.deleteBranch,
);

export function* branchDetailSaga() {
  yield takeLatest(BRANCH_DETAIL, getBranchSaga);
  yield takeLatest(BRANCH_UPDATE, branchUpdateSaga);
  yield takeLatest(BRANCH_DELETE, branchDeleteSaga);
}

const initialState = {
  originBranch: null,
  branchResult: null,
  branchError: null,
};

export const branchDetail = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft['originBranch'][key] = value;
      }),
    [INITIALIZE_RESULT]: (state) => ({
      ...state,
      branchResult: null,
    }),
    [BRANCH_DETAIL_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      originBranch: data,
      branchResult: null,
      branchError: null,
    }),
    [BRANCH_DETAIL_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      branchError: message,
    }),
    [BRANCH_UPDATE_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      branchResult: code,
      branchError: null,
    }),
    [BRANCH_UPDATE_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      branchResult: null,
      branchError: message,
    }),
    [BRANCH_DELETE_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      branchResult: code,
      branchError: null,
    }),
    [BRANCH_DELETE_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      branchResult: null,
      branchError: message,
    }),
  },
  initialState,
);

export default branchDetail;
