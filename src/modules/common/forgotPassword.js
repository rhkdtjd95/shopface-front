import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import produce from 'immer';
import * as authAPI from '../../lib/api/common/authAPI';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_INPUT = 'forgotPassword/CHANGE_INPUT';
const INITIALIZE_FORM = 'forgotPassword/INITIALIZE_FORM';
const [
  FORGOT_PASSWORD_CODE,
  FORGOT_PASSWORD_CODE_SUCCESS,
  FORGOT_PASSWORD_CODE_FAILURE,
] = createRequestActionTypes('forgotPassword/FORGOT_PASSWORD_SEND');
const [
  CHANGE_FORGOT_PASSWORD,
  CHANGE_FORGOT_PASSWORD_SUCCESS,
  CHANGE_FORGOT_PASSWORD_FAILURE,
] = createRequestActionTypes('forgotPassword/CHANGE_FORGOT_PASSWORD');

export const changeInput = createAction(CHANGE_INPUT, ({ key, value }) => ({
  key,
  value,
}));
export const initializeForm = createAction(INITIALIZE_FORM);
export const sendForgotPassword = createAction(
  FORGOT_PASSWORD_CODE,
  ({ name }) => ({ name }),
);
export const changeForgotPassword = createAction(
  CHANGE_FORGOT_PASSWORD,
  ({ data }) => ({ data }),
);

const sendForgotPasswordSaga = createRequestSaga(
  FORGOT_PASSWORD_CODE,
  authAPI.sendForgotPasswordCode,
);
const changeForgotPasswordSaga = createRequestSaga(
  CHANGE_FORGOT_PASSWORD,
  authAPI.changeForgotPassword,
);

export function* forgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD_CODE, sendForgotPasswordSaga);
  yield takeLatest(CHANGE_FORGOT_PASSWORD, changeForgotPasswordSaga);
}

const initialState = {
  changePassword: {
    name: null,
    code: '',
    changePassword: '',
  },
  sendCodeResult: null,
  changePasswordResult: null,
  forgotPasswordError: null,
};

const forgotPassword = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft['changePassword'][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: { initForm } }) => ({
      ...state,
      [initForm]: initialState[initForm],
      sendCodeResult: null,
      changePasswordResult: null,
      forgotPasswordError: null,
    }),
    [FORGOT_PASSWORD_CODE_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      sendCodeResult: code,
    }),
    [FORGOT_PASSWORD_CODE_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      forgotPasswordError: e,
    }),
    [CHANGE_FORGOT_PASSWORD_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      changePasswordResult: code,
    }),
    [CHANGE_FORGOT_PASSWORD_FAILURE]: (state, { payload: { code } }) => ({
      ...state,
      forgotPasswordError: code,
    }),
  },
  initialState,
);

export default forgotPassword;
