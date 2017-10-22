import React, { PureComponent } from 'react';
import List from '../../../components/user/List';

class ViewList extends PureComponent {

  render() {
    return (
      <List
        fieldName="userCustomers"
        tabSelected="0"
        title="Cliente"
        userType="customer"
      />
    );
  }
}

/**
 * Export component
 */
export default ViewList;
