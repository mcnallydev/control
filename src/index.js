import { createBrowserRouter, makeRouteConfig, Route } from 'found';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// user admin
import UserAdminList from './components/pages/user/admin/List';
import UserAdminCreate from './components/pages/user/admin/Create';
import UserAdminUpdate from './components/pages/user/admin/Update';

import registerServiceWorker from './registerServiceWorker';

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <Route path="/" Component={App}>
      <Route path="/users">
        <Route path="/admin">
          <Route path="/" Component={UserAdminList} />
          <Route path="/create" Component={UserAdminCreate} />
          <Route path="/:id/update" Component={UserAdminUpdate} />
        </Route>
      </Route>
    </Route>
  ),
  renderError: ({ error }) => (
    <div>
      {error.status === 404 ? 'Not found' : 'Error'}
    </div>
  ),
});

ReactDOM.render(<BrowserRouter />, document.getElementById('root'));
registerServiceWorker();
