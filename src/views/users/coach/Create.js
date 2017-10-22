import React, { PureComponent } from 'react';
import Create from '../../../components/user/Create';

class ViewCreate extends PureComponent {

  render() {
    return (
      <Create
        title="entrenador"
        userRole={1}
        userType="coach"
      />
    );
  }
}

/**
 * Export component
 */
export default ViewCreate;
