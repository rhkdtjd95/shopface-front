import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/common/authAPI';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_INPUT = 'certCode/CHANGE_INPUT';
const INITIALIZE_FORM = 'certCode/INITIALIZE_FORM';

const [
  CHECK_CERTCODE,
  CHECK_CERTCODE_SUCCESS,
  CHECK_CERTCODE_FAILURE,
] = createRequestActionTypes('certCode/CHECK_CERTCODE');

const [
  PATCH_EMPLOY_BY_CERTCODE,
  PATCH_EMPLOY_BY_CERTCODE_SUCCESS,
  PATCH_EMPLOY_BY_CERTCODE_FAILURE,
] = createRequestActionTypes('certCode/PATCH_EMPLOY_BY_CERTCODE');

export const changeInput = createAction(CHANGE_INPUT, ({ certCode }) => ({
  certCode,
}));

export const initialize = createAction(INITIALIZE_FORM);

export const checkCertCode = createAction(CHECK_CERTCODE, ({ certCode }) => ({
  certCode,
}));
export const patchEmployByCertCode = createAction(
  PATCH_EMPLOY_BY_CERTCODE,
  ({ memberId, certCode }) => ({
    memberId,
    certCode,
  }),
);

const checkCertCodeSaga = createRequestSaga(
  CHECK_CERTCODE,
  authAPI.checkCertCode,
);
const patchEmployByCertCodeSaga = createRequestSaga(
  PATCH_EMPLOY_BY_CERTCODE,
  authAPI.patchEmployByCertCode,
);

export function* certCodeSaga() {
  yield takeLatest(CHECK_CERTCODE, checkCertCodeSaga);
  yield takeLatest(PATCH_EMPLOY_BY_CERTCODE, patchEmployByCertCodeSaga);
}

const initialState = {
  certCode: null,
  certCodeResult: null,
  certCodeError: null,
};

const certCode = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { certCode } }) => ({
      ...state,
      certCode: certCode,
      certCodeError: null,
    }),
    [INITIALIZE_FORM]: () => ({
      certCode: '',
      certCodeResult: null,
      certCodeError: null,
    }),
    [CHECK_CERTCODE_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      certCodeResult: data,
      certCodeError: null,
    }),
    [CHECK_CERTCODE_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      certCodeError: message,
    }),
    [PATCH_EMPLOY_BY_CERTCODE_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      certCodeResult: data,
      certCodeError: null,
    }),
    [PATCH_EMPLOY_BY_CERTCODE_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      certCodeError: message,
    }),
  },
  initialState,
);

export default certCode;
