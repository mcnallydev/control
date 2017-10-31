import React, { PureComponent } from 'react';
import Billing from '../../components/billing/Billing';
import List from '../../components/payment_methods/List';

class ViewList extends PureComponent {

  render() {
    return (
      <Billing
        title="Métodos de pago"
        tabSelected="1"
      >
        <List />
      </Billing>
    );
  }
}

/**
 * Export component
 */
export default ViewList;
