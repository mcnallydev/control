import React, { PureComponent } from 'react';
import Update from '../../../components/user/Update';

class ViewUpdate extends PureComponent {

  render() {
    return (
      <Update
        id={parseInt(this.props.params.id, 10)}
        title="administrador"
        userType="admin"
      />
    );
  }
}

/**
 * Export component
 */
export default ViewUpdate;
