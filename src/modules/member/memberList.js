import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as memberAPI from '../../lib/api/member/memberAPI';

const [
  MEMBER_LIST,
  MEMBER_LIST_SUCCESS,
  MEMBER_LIST_FAILURE,
] = createRequestActionTypes('memberList/MEMBER_LIST');
const CHANGE_INPUT = 'memberList/CHANGE_INPUT';

export const getMemberList = createAction(MEMBER_LIST);
export const changeInput = createAction(CHANGE_INPUT, (value) => value);

const memberListSaga = createRequestSaga(MEMBER_LIST, memberAPI.getMemberList);

export function* memberSaga() {
  yield takeLatest(MEMBER_LIST, memberListSaga);
}

const initialState = {
  name: '',
  members: null,
  memberError: null,
};

const memberList = handleActions(
  {
    [MEMBER_LIST_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      members: data,
      memberError: null,
    }),
    [MEMBER_LIST_FAILURE]: (state, { payload: { e } }) => ({
      ...state,
      memberError: e,
    }),
    [CHANGE_INPUT]: (state, { payload: value }) => ({
      ...state,
      name: value,
    }),
  },
  initialState,
);

export default memberList;
