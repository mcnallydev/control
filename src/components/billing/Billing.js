import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from '../master/header';
import Tabs from '../master/tabs';

class Billing extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          text: 'Facturación',
          href: `/billing`
        },
        {
          text: 'Métodos de pago',
          href: `/payment_methods`
        },
        {
          text: 'Tipos de pago',
          href: `/payment_types`
        },
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

Billing.propTypes = {
  tabSelected: PropTypes.oneOf([
    '0',
    '1',
    '2'
  ]),
  title: PropTypes.string.isRequired,
};

/**
 * Export component
 */
export default Billing;
