import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import * as employAPI from '../../lib/api/employ/employAPI';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_INPUT = 'employPost/CHANGE_INPUT';
const INITIALIZE_FORM = 'employPost/INITIALIZE_FORM';

const [
  EMPLOY_POST,
  EMPLOY_POST_SUCCESS,
  EMPLOY_POST_FAILURE,
] = createRequestActionTypes('employPost/EMPLOY_POST');

export const changeInput = createAction(CHANGE_INPUT, ({ key, value }) => ({
  key,
  value,
}));

export const postEmploy = createAction(EMPLOY_POST, ({ post }) => ({ post }));

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (initForm) => initForm,
);

const initialState = {
  post: {
    name: '',
    // email: '',
  },
  postResult: null,
  postError: null,
};

export const postSaga = createRequestSaga(EMPLOY_POST, employAPI.postEmploy);

export function* employPostSaga() {
  yield takeLatest(EMPLOY_POST, postSaga);
}

export const employPost = handleActions(
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
    [EMPLOY_POST_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      postResult: code,
      postError: null,
    }),
    [EMPLOY_POST_FAILURE]: (state, { payload: e }) => ({
      ...state,
      postError: e,
    }),
  },
  initialState,
);

export default employPost;
