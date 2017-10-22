import React, { PureComponent } from 'react';
import { Link } from 'found';
import styled, { css } from 'react-emotion';
import Input from 'react-md-input';
import Card from 'react-md-card';
import ProgressBar from 'react-md-progress-bar';
import Button from 'react-md-button';
import Header from '../../../master/header';
import Request from '../../../../helpers/Request';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 500px;
`;

const ButtonsContainer = styled.div`
  position: relative;
  overflow: hidden;
  text-align: right;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const LinkClassName = css`
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  float: right;
  padding: 10px 15px;
  color: #4285f4;
  &:hover {
    background-color: rgba(158, 158, 158, .2);
    border-radius: 2px;
  }
`;

const ButtonContainer = styled.div`
  float: right;
  margin-left: 10px;
`;

const Error = styled.div`
  color: #d50000;
  flex: 1 1 auto;
  font-size: 14px;
  padding: 6px;
  border-radius: 3px;
  margin-top: 20px;
  text-align: center;
`;

class AdminCreate extends PureComponent {
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
        email: '',
        password: '',
        role: 0,
      },
      errors: {
        name: '',
        email: '',
        password: '',
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
        self.validateInput('email', (emailStatus) => {
          console.log(emailStatus);
          if (emailStatus) {
            self.validateInput('password', (passwordStatus) => {
              if (passwordStatus) {
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
        field: 'email',
        value: this.state.form.email,
      },
      {
        field: 'password',
        value: this.state.form.password,
      },
      {
        field: 'role',
        value: this.state.form.role,
      }
    ];

    // response
    const fields = [
      {
        field: 'user'
      }
    ];

    // make http request
    request.mutate('UserCreate', 'userCreate', inputs, fields).then((result) => {
      window.location = `/users/admin`
    }).catch((error) => {
      this.setState({
        progressBar: false,
        error: error.graphQLErrors[0].message
      });
      console.log();
    });
  }

  render() {
    return (
      <div>
        <Header title="Crear un usuario administrador"></Header>
        <ProgressBar show={this.state.progressBar} overlay={this.state.progressBar} />
        <Wrapper>
          <Error>{this.state.error}</Error>
          <Card>
            <Input
              label="Nombres y apellidos"
              type="text"
              value={this.state.form.name}
              error={this.state.errors.name}
              onChange={ this.onChange('name') }
            />
            <Input
              label="Correo electrónico"
              type="text"
              value={this.state.form.email}
              error={this.state.errors.email}
              onChange={ this.onChange('email') }
            />
            <Input
              label="Contraseña"
              type="password"
              value={this.state.form.password}
              error={this.state.errors.password}
              onChange={ this.onChange('password') }
            />
            <ButtonsContainer>
              <ButtonContainer>
                <Button onClick={ this.onClick } primary={true} label="Crear" />
              </ButtonContainer>
              <Link to="/users/admin" className={LinkClassName} exact>
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
export default AdminCreate;
