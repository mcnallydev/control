import React, { PureComponent } from 'react';
import Header from '../master/header';
import Customer from './Customer';
import Form from './Form';
import styled from 'react-emotion';

const Wrapper = styled.div`
  overflow: visible;
`;

class Create extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      customer: {}
    };
  }

  /**
   * OnClick event to hangle customer select
   */
  onClick = (customer) => {
    this.setState({
      customer: customer
    });
  }

  /**
   * To render search customer component
   */
  renderCustomer() {
    let component = null;
    if (!this.state.customer.hasOwnProperty('id')) {
      component = <Customer onClick={this.onClick} />;
    }
    return (component);
  }

  renderForm() {
    let output = null;
    if (this.state.customer.hasOwnProperty('id')) {
      output = (
        <Form
          customer={this.state.customer}
        />
      );
    }
    return output;
  }

  render() {
    return (
      <Wrapper>
        <Header title="Crear registro de pago"></Header>
        {this.renderCustomer()}
        {this.renderForm()}
      </Wrapper>
    );
  }
}

/**
 * Export component
 */
export default Create;
