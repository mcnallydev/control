import React, { PureComponent } from 'react';
import Update from '../../components/payment_types/Update';

class ViewUpdate extends PureComponent {

  render() {
    return (
      <Update
        id={parseInt(this.props.params.id, 0)}
      />
    );
  }
}

/**
 * Export component
 */
export default ViewUpdate;
