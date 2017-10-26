import React, { PureComponent } from 'react';
import Profile from '../../../components/user/Profile';

class ViewAbout extends PureComponent {
  render() {
    return (
      <Profile
        id={parseInt(this.props.params.id, 10)}
        tabSelected="2"
        title="Progreso"
      >
        <div>Progress</div>
      </Profile>
    );
  }
}

/**
 * Export component
 */
export default ViewAbout;
