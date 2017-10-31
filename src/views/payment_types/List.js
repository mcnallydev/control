import React, { PureComponent } from 'react';
import Billing from '../../components/billing/Billing';

class ViewList extends PureComponent {

  render() {
    return (
      <Billing
        title="Tipos de pago"
        tabSelected="2"
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
