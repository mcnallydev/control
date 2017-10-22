import React, { PureComponent } from 'react';
import Create from '../../../components/user/Create';

class ViewCreate extends PureComponent {

  render() {
    return (
      <Create
        title="cliente"
        userRole={2}
        userType="customer"
      />
    );
  }
}

/**
 * Export component
 */
export default ViewCreate;
