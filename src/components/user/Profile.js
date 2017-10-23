import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from '../master/header';
import Tabs from '../master/tabs';

class Profile extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          text: 'Pagos',
          href: `/users/customer/${this.props.id}/payments`
        },
        {
          text: 'Asistencias',
          href: `/users/customer/${this.props.id}/assists`
        },
        {
          text: 'Progreso',
          href: `/users/customer/${this.props.id}/progress`
        },
        {
          text: 'Información',
          href: `/users/customer/${this.props.id}/about`
        }
      ]

    }
  }

  render() {
    return (
      <div>
        <Header title={this.props.title} />
        <Tabs items={this.state.tabs} selected={this.props.tabSelected} />
        {this.props.children}
      </div>
    );
  }
}

Profile.propTypes = {
  id: PropTypes.number.isRequired,
  tabSelected: PropTypes.oneOf([
    '0',
    '1',
    '2',
    '3'
  ]),
  title: PropTypes.string.isRequired,
};

/**
 * Export component
 */
export default Profile;
