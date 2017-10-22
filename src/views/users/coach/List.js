import React, { PureComponent } from 'react';
import List from '../../../components/user/List';

class ViewList extends PureComponent {

  render() {
    return (
      <List
        fieldName="userCoaches"
        tabSelected="1"
        title="Entrenadores"
        userType="coach"
      />
    );
  }
}

/**
 * Export component
 */
export default ViewList;
