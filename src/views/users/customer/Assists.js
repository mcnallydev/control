import React, { PureComponent } from 'react';
import Profile from '../../../components/user/Profile';

class ViewAssists extends PureComponent {
  render() {
    return (
      <Profile
        id={parseInt(this.props.params.id, 10)}
        tabSelected="1"
        title="Asistencias"
      >
        <div>Progress</div>
      </Profile>
    );
  }
}

/**
 * Export component
 */
export default ViewAssists;
