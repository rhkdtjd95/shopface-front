import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import branchDetail, { branchDetailSaga } from './branch/branchDetail';
import branchList, { branchSaga } from './branch/branchList';
import branchPost, { branchPostSaga } from './branch/branchPost';
import branchSelect from './branch/branchSelect';
import alarm, { alarmSaga } from './common/alarm';
import auth, { authSaga } from './common/auth';
import certCode, { certCodeSaga } from './common/certCode';
import forgotPassword, { forgotPasswordSaga } from './common/forgotPassword';
import loading from './common/loading';
import dashboard, { dashboardSaga } from './dashboard/dashboard';
import employDetail, { employDetailSaga } from './employ/employDetail';
import employList, { employSaga } from './employ/employList';
import employPost, { employPostSaga } from './employ/employPost';
import memberDetail, { memberDetailSaga } from './member/memberDetail';
import memberList, { memberSaga } from './member/memberList';
import occupation, { occupationSaga } from './occupation/occupation';
import recordList, { recordSaga } from './record/recordList';
import scheduleList, { scheduleSaga } from './schedule/scheduleList';
import scheduleSelect from './schedule/scheduleSelect';

const rootReducer = combineReducers({
  auth,
  alarm,
  certCode,
  forgotPassword,
  loading,
  branchList,
  branchPost,
  branchDetail,
  occupation,
  memberList,
  recordList,
  employList,
  employPost,
  employDetail,
  memberDetail,
  branchSelect,
  scheduleList,
  dashboard,
  scheduleSelect,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    forgotPasswordSaga(),
    alarmSaga(),
    certCodeSaga(),
    branchSaga(),
    branchPostSaga(),
    branchDetailSaga(),
    occupationSaga(),
    memberSaga(),
    recordSaga(),
    employSaga(),
    employPostSaga(),
    employDetailSaga(),
    memberDetailSaga(),
    scheduleSaga(),
    dashboardSaga(),
  ]);
}

export default rootReducer;
