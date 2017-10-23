import React, { PureComponent } from 'react';
import Profile from '../../../components/user/Profile';

class ViewPayments extends PureComponent {
  render() {
    return (
      <Profile
        id={parseInt(this.props.params.id, 10)}
        tabSelected="0"
        title="Pagos"
      >
        <div>Progress</div>
      </Profile>
    );
  }
}

/**
 * Export component
 */
export default ViewPayments;
