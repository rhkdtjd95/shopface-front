import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import SideBarMenu from '../src/components/common/SidebarMenu';
import SidebarHeaderContainer from './containers/common/SidebarHeaderContainer';
import client from './lib/api/client';
import { checkExpire } from './lib/api/common/authAPI';
import { getBranchList } from './modules/branch/branchList';
import { logout } from './modules/common/auth';
import SchedulePage from './pages/schedule/SchedulePage';
import ForgotPasswordPage from './pages/common/ForgotPasswordPage';

const LoginPage = lazy(() => import('./pages/common/LoginPage'));
const CertCodePage = lazy(() => import('./pages/common/CertCodePage'));
const BranchPage = lazy(() => import('./pages/branch/BranchPage'));
const RegisterPage = lazy(() => import('./pages/common/RegisterPage'));
const EmployPage = lazy(() => import('./pages/employ/EmployPage'));
const MemberPage = lazy(() => import('./pages/member/MemberPage'));
const OccupationPage = lazy(() => import('./pages/occupation/OccupationPage'));
const RecordPage = lazy(() => import('./pages/record/RecordPage'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));

const App = ({ history }) => {
  const dispatch = useDispatch();
  const { user, branchs } = useSelector(({ auth, branchList }) => ({
    user: auth.user,
    branchs: branchList.branchs,
  }));

  const onLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (user !== null) {
      client.defaults.headers.common['Authorization'] = 'bearer ' + user.jwt;
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });

      if (user.type !== 'A') {
        const { name } = user;
        dispatch(getBranchList({ name }));
      }
    } else {
      if (
        window.location.pathname === '/certcode' ||
        window.location.pathname === '/forgotpassword' ||
        window.location.pathname === '/register'
      ) {
        return;
      }
      history.push('/login');
    }
  }, [history, dispatch, user]);

  if (
    window.location.pathname === '/login' ||
    window.location.pathname === '/register' ||
    window.location.pathname === '/forgotpassword' ||
    window.location.pathname === '/certcode'
  ) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/forgotpassword" component={ForgotPasswordPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/certcode" component={CertCodePage} />
        </Switch>
      </Suspense>
    );
  } else {
    return (
      <>
        <div className="row">
          <div style={{ position: 'fixed' }}>
            <SideBarMenu user={user} />
          </div>

          <div
            className="col p-0"
            style={{ marginLeft: '16rem', position: 'relative' }}
          >
            <SidebarHeaderContainer
              onLogout={onLogout}
              branchs={branchs}
              user={user}
            />
            <div className="content">
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path="/member" component={MemberPage} />
                  <Route path="/" component={DashboardPage} exact />
                  <Route path="/employ" component={EmployPage} />
                  <Route path="/occupation" component={OccupationPage} />
                  <Route path="/record" component={RecordPage} />
                  <Route path="/schedule" component={SchedulePage} />
                  <Route path="/branch" component={BranchPage} />
                </Switch>
              </Suspense>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default withRouter(App);
