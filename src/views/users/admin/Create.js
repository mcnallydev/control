import React, { PureComponent } from 'react';
import Create from '../../../components/user/Create';

class ViewCreate extends PureComponent {

  render() {
    return (
      <Create
        title="administrador"
        userRole={0}
        userType="admin"
      />
    );
  }
}

/**
 * Export component
 */
export default ViewCreate;
