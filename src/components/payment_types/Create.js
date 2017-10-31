import React, { PureComponent } from 'react';
import { Link } from 'found';
import Input from 'react-md-input';
import Card from 'react-md-card';
import ProgressBar from 'react-md-progress-bar';
import Button from 'react-md-button';
import { Wrapper, ButtonsContainer, LinkClassName, ButtonContainer, Error } from '../../styles/global';
import Header from '../master/header';
import Request from '../../helpers/Request';

class Create extends PureComponent {
  /**
   * React component constructor
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        cost: '',
        days: '',
      },
      errors: {
        name: '',
        cost: '',
        days: '',
      },
      error: '',
      progressBar: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  /**
   * Change event on inputs
   * @param  {String} propertyName
   * @param  {Object} event
   */
  onChange = (propertyName) => (event) => {
    const { form } = this.state;
    const newForm = {
      ...form,
      [propertyName]: event.target.value
    };
    this.setState({ form: newForm });
  }

  /**
   * Validate input with callback
   * @param  {String}
   * @param  {Function} cb
   */
  validateInput(key, cb) {
    let message = (this.state.form[key] === '') ? 'Es un campo requerido.' : '';
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [key]: message
      }
    }));
    cb(message === '');
  }

  /**
   * Click action on button create
   */
  onClick() {
    let self = this;
    self.validateInput('name', (nameStatus) => {
      if (nameStatus) {
        self.validateInput('cost', (costStatus) => {
          if (costStatus) {
            self.validateInput('days', (daysStatus) => {
              if (daysStatus) {
                this.httpRequest();
              }
            });
          }
        });
      }
    });
  }

  /**
   * Http Request
   */
  httpRequest() {
    this.setState({
      progressBar: true,
      error: ''
    });

    // instance request
    const request = new Request();

    // inputs
    const inputs =  [
      {
        field: 'name',
        value: this.state.form.name,
      },
      {
        field: 'cost',
        value: parseFloat(this.state.form.cost),
      },
      {
        field: 'days',
        value: parseInt(this.state.form.days, 0),
      }
    ];

    // response
    const fields = [
      {
        field: 'payment_type',
        fields: [
          {
            field: 'id'
          }
        ]
      }
    ];

    // make http request
    request.mutate('PaymentTypeCreate', 'paymentTypeCreate', inputs, fields, false).then((result) => {
      window.location = '/payment_types';
    }).catch((error) => {
      this.setState({
        progressBar: false,
        error: error.graphQLErrors[0].message
      });
    });
  }

  render() {
    return (
      <div>
        <Header title="Crear tipo de pago"></Header>
        <ProgressBar show={this.state.progressBar} overlay={this.state.progressBar} />
        <Wrapper>
          <Error>{this.state.error}</Error>
          <Card>
            <Input
              label="Nombre"
              type="text"
              value={this.state.form.name}
              error={this.state.errors.name}
              onChange={ this.onChange('name') }
            />
            <Input
              label="Precio"
              type="text"
              value={this.state.form.cost}
              error={this.state.errors.cost}
              pattern="patternDecimal"
              onChange={ this.onChange('cost') }
            />
            <Input
              label="Días"
              type="text"
              value={this.state.form.days}
              error={this.state.errors.days}
              pattern="patternInteger"
              onChange={ this.onChange('days') }
            />
            <ButtonsContainer>
              <ButtonContainer>
                <Button onClick={ this.onClick } primary={true} label="Crear" />
              </ButtonContainer>
              <Link to="/payment_types" className={LinkClassName} exact>
                Cancelar
              </Link>
            </ButtonsContainer>
          </Card>
        </Wrapper>
      </div>
    );
  }
}

/**
 * Export component
 */
export default Create;
