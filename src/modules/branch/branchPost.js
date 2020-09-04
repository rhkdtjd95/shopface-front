import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import * as branchAPI from '../../lib/api/branch/branchAPI';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_INPUT = 'branchPost/CHANGE_INPUT';
const INITIALIZE_FORM = 'branchPost/INITIALIZE_FORM';

const [
  BRANCH_POST,
  BRANCH_POST_SUCCESS,
  BRANCH_POST_FAILURE,
] = createRequestActionTypes('branchPost/BRANCH_POST');

export const changeInput = createAction(CHANGE_INPUT, ({ key, value }) => ({
  key,
  value,
}));

export const postBranch = createAction(BRANCH_POST, ({ post }) => ({ post }));

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (initForm) => initForm,
);

const initialState = {
  post: {
    name: '',
    phone: '',
    zipCode: '',
    address: '',
    detailAddress: '',
  },
  postResult: null,
  postError: null,
};

export const postSaga = createRequestSaga(BRANCH_POST, branchAPI.postBranch);

export function* branchPostSaga() {
  yield takeLatest(BRANCH_POST, postSaga);
}

export const branchPost = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft['post'][key] = value;
      }),
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      post: initialState['post'],
      postResult: null,
    }),
    [BRANCH_POST_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      postResult: code,
      postError: null,
    }),
    [BRANCH_POST_FAILURE]: (state, { payload: e }) => ({
      ...state,
      postError: e,
    }),
  },
  initialState,
);

export default branchPost;
