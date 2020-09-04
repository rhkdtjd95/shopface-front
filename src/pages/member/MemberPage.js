import React, { Suspense, lazy } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
const MemberDetailContainer = lazy(() =>
  import('../../containers/member/MemberDetailContainer'),
);
const MemberListContainer = lazy(() =>
  import('../../containers/member/MemberListContainer'),
);

const MemberPage = ({ match }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={match.url} component={MemberListContainer} exact />
          <Route path={`${match.url}/:id`} component={MemberDetailContainer} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default withRouter(MemberPage);
