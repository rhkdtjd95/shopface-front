import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/common/authAPI';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const TEMP_SET_USER = 'auth/TEMP_SET_USER';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes(
  'auth/LOGOUT',
);
const [
  REGISTER_MEMBER,
  REGISTER_MEMBER_SUCCESS,
  REGISTER_MEMBER_FAILURE,
] = createRequestActionTypes('auth/REGISTER_MEMBER');

export const changeInput = createAction(
  CHANGE_INPUT,
  ({ type, id, value }) => ({
    type,
    id,
    value,
  }),
);
export const initializeForm = createAction(
  INITIALIZE_FORM,
  (initForm) => initForm,
);
export const tempSetUser = createAction(TEMP_SET_USER, (user) => ({
  user,
}));

export const login = createAction(LOGIN, ({ id, password }) => ({
  id,
  password,
}));
export const logout = createAction(LOGOUT);
export const registerMember = createAction(
  REGISTER_MEMBER,
  ({ member, certCode }) => ({
    member,
    certCode,
  }),
);

const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout);
const registerSaga = createRequestSaga(REGISTER_MEMBER, authAPI.signUp);

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(REGISTER_MEMBER, registerSaga);
}

const initialState = {
  login: {
    id: '',
    password: '',
  },
  register: {
    id: '',
    password: '',
    name: '',
    phone: '',
    email: '',
  },
  registerResult: null,
  user: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: { type, id, value } }) =>
      produce(state, (draft) => {
        draft[type][id] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: initForm }) => ({
      ...state,
      [initForm]: initialState[initForm],
      registerResult: null,
      authError: null,
    }),
    [TEMP_SET_USER]: (state, { payload: { user } }) => ({
      ...state,
      user,
    }),
    [LOGIN_SUCCESS]: (state, { payload: { user } }) => ({
      ...state,
      user,
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      authError: message,
    }),
    [LOGOUT_SUCCESS]: (state) => ({
      ...state,
      user: null,
      authError: null,
    }),
    [LOGOUT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      authError: e,
    }),
    [REGISTER_MEMBER_SUCCESS]: (state, { payload: { code } }) => ({
      ...state,
      registerResult: code,
      authError: null,
    }),
    [REGISTER_MEMBER_FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      registerResult: null,
      authError: message,
    }),
  },
  initialState,
);

export default auth;
