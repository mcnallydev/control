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
// billing
import BillingList from './views/billing/List';
import BillingCreate from './views/billing/Create';
// payment_methods
import PaymentMethodsList from './views/payment_methods/List';
import PaymentMethodsCreate from './views/payment_methods/Create';
import PaymentMethodsUpdate from './views/payment_methods/Update';
// payment_types
import PaymentTypesList from './views/payment_types/List';
import PaymentTypesCreate from './views/payment_types/Create';
import PaymentTypesUpdate from './views/payment_types/Update';

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
      <Route path="/billing">
        <Route path="/" Component={BillingList} />
        <Route path="/create" Component={BillingCreate} />
      </Route>
      <Route path="/payment_methods">
        <Route path="/" Component={PaymentMethodsList} />
        <Route path="/create" Component={PaymentMethodsCreate} />
        <Route path="/:id/update" Component={PaymentMethodsUpdate} />
      </Route>
      <Route path="/payment_types">
        <Route path="/" Component={PaymentTypesList} />
        <Route path="/create" Component={PaymentTypesCreate} />
        <Route path="/:id/update" Component={PaymentTypesUpdate} />
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
