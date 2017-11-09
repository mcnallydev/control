import React, { PureComponent } from 'react';
import Billing from '../../components/billing/Billing';
import List from '../../components/billing/List';

class ViewList extends PureComponent {

  render() {
    return (
      <Billing
        title="Demo"
        tabSelected="0"
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
