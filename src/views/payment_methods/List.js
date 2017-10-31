import React, { PureComponent } from 'react';
import Billing from '../../components/billing/Billing';

class ViewList extends PureComponent {

  render() {
    return (
      <Billing
        title="Métodos de pago"
        tabSelected="1"
      >
        <div>Demo</div>
      </Billing>
    );
  }
}

/**
 * Export component
 */
export default ViewList;
