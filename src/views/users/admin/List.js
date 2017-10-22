import React, { PureComponent } from 'react';
import List from '../../../components/user/List';

class ViewList extends PureComponent {

  render() {
    return (
      <List
        fieldName="userAdmins"
        tabSelected="2"
        title="Administradores"
        userType="admin"
      />
    );
  }
}

/**
 * Export component
 */
export default ViewList;
