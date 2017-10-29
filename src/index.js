import { createBrowserRouter, makeRouteConfig, Route } from 'found';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// user customer
import UsersCustomerList from './views/users/customer/List';
import UsersCustomerUpdate from './views/users/customer/Update';
import UsersCustomerCreate from './views/users/customer/Create';
import UsersCustomerPayments from './views/users/customer/Payments';
import UsersCustomerAssists from './views/users/customer/Assists';
import UsersCustomerProgress from './views/users/customer/Progress';
import UsersCustomerProgressCreate from './views/users/customer/ProgressCreate';
import UsersCustomerAbout from './views/users/customer/About';
// user coach
import UsersCoachList from './views/users/coach/List';
import UsersCoachUpdate from './views/users/coach/Update';
import UsersCoachCreate from './views/users/coach/Create';
// user admin
import UsersAdminList from './views/users/admin/List';
import UsersAdminUpdate from './views/users/admin/Update';
import UsersAdminCreate from './views/users/admin/Create';
// disciplines
import DisciplinesList from './views/disciplines/List';
import DisciplinesCreate from './views/disciplines/Create';
import DisciplinesUpdate from './views/disciplines/Update';

import registerServiceWorker from './registerServiceWorker';

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <Route path="/" Component={App}>
      <Route path="/users">
        <Route path="/customer">
          <Route path="/" Component={UsersCustomerList} />
          <Route path="/create" Component={UsersCustomerCreate} />
          <Route path="/:id/update" Component={UsersCustomerUpdate} />
          <Route path="/:id/payments" Component={UsersCustomerPayments} />
          <Route path="/:id/assists" Component={UsersCustomerAssists} />
          <Route path="/:id/progress" Component={UsersCustomerProgress} />
          <Route path="/:id/progress/create" Component={UsersCustomerProgressCreate} />
          <Route path="/:id/about" Component={UsersCustomerAbout} />
        </Route>
        <Route path="/coach">
          <Route path="/" Component={UsersCoachList} />
          <Route path="/create" Component={UsersCoachCreate} />
          <Route path="/:id/update" Component={UsersCoachUpdate} />
        </Route>
        <Route path="/admin">
          <Route path="/" Component={UsersAdminList} />
          <Route path="/create" Component={UsersAdminCreate} />
          <Route path="/:id/update" Component={UsersAdminUpdate} />
        </Route>
      </Route>
      <Route path="/disciplines">
        <Route path="/" Component={DisciplinesList} />
        <Route path="/create" Component={DisciplinesCreate} />
        <Route path="/:id/update" Component={DisciplinesUpdate} />
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
