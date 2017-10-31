import React, { PureComponent } from 'react';
import Billing from '../../components/billing/Billing';
import List from '../../components/payment_types/List';

class ViewList extends PureComponent {

  render() {
    return (
      <Billing
        title="Tipos de pago"
        tabSelected="2"
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
