import React, { Suspense, lazy } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

const BranchDetailContainer = lazy(() =>
  import('../../containers/branch/BranchDetailContainer'),
);
const BranchListContainer = lazy(() =>
  import('../../containers/branch/BranchListContainer'),
);
const BranchPostContainer = lazy(() =>
  import('../../containers/branch/BranchPostContainer'),
);

const BranchPage = ({ match }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={match.url} component={BranchListContainer} exact />
          <Route path={`${match.url}/post`} component={BranchPostContainer} />
          <Route path={`${match.url}/:no`} component={BranchDetailContainer} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default withRouter(BranchPage);
