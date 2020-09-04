import React, { Suspense, lazy } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

const EmployDetailContainer = lazy(() =>
  import('../../containers/employ/EmployDetailContainer'),
);
const EmployListContainer = lazy(() =>
  import('../../containers/employ/EmployListContainer'),
);

const EmployPage = ({ match }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={match.url} component={EmployListContainer} exact />
          <Route path={`${match.url}/:no`} component={EmployDetailContainer} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default withRouter(EmployPage);
