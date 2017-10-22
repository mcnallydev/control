import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Button from 'react-md-button';
import Card from 'react-md-card';
import Input from 'react-md-input';
import ProgressBar from 'react-md-progress-bar';
import Request from '../../../helpers/Request';
import { Wrapper, Middle, Inner, Title, SubTitle, ButtonContainer } from './styles';

class Login extends PureComponent {
  /**
   * React component constructor
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      form: {
        domain: '',
        email: '',
        password: '',
      },
      progressBar: false,
    };
  }

  /**
   * Change event on inputs
   * @param  {Object} event
   * @param  {String} key
   */
  onChange = (event, key) => {
    this.setState({
      form : Object.assign({}, this.state.form, {[key]: event.target.value})
    });
  }

  /**
   * Button OnClick
   */
  onClick = () => {
    if (this.state.form.domain !== '') {
      const request = new Request(this.state.form.domain);

      this.setState({
        progressBar: true
      });

      // inputs
      const inputs =  [
        {
          field: 'email',
          value: this.state.form.email,
        },
        {
          field: 'password',
          value: this.state.form.password,
        }
      ];

      // response
      const fields = [
        {
          field: 'accessToken'
        }
      ];

      // make http request
      request.mutate('Login', 'login', inputs, fields).then((result) => {
        // check if accessToken exists
        if (result.hasOwnProperty('data') && result.data.hasOwnProperty('login') && result.data.login.hasOwnProperty('accessToken')) {
          Cookies.set('Authorization', result.data.login.accessToken);
          Cookies.set('Tenant', this.state.form.domain);

          this.props.onChange(true);
        } else {
          console.log(result.error);
        }
      }).catch((error) => {
        this.setState({
          progressBar: false
        });
        console.log(error.graphQLErrors);
      });
    }
  }

  /**
   * React component render
   * @return {JSX}
   */
  render() {
    return (
      <Wrapper>
        <Middle>
          <Inner>
            <Card>
              <ProgressBar show={this.state.progressBar} overlay={this.state.progressBar} />
              <Title>Iniciar sesión</Title>
              <SubTitle>para entrar al sistema.</SubTitle>
              <Input
                label="Dominio"
                type="text"
                value={this.state.form.domain}
                onChange={ (e) => this.onChange(e, 'domain') }
              />
              <Input
                label="Correo electrónico"
                type="text"
                value={this.state.form.email}
                onChange={ (e) => this.onChange(e, 'email') }
              />
              <Input
                label="Contraseña"
                type="password"
                value={this.state.form.password}
                onChange={ (e) => this.onChange(e, 'password') }
              />
              <ButtonContainer>
                <Button
                  primary={true}
                  disabled={this.state.isValidForm}
                  label="Entrar"
                  onClick={ () => this.onClick() }
                />
              </ButtonContainer>
            </Card>
          </Inner>
        </Middle>
      </Wrapper>
    );
  }
}

/**
 * PropTypes from component
 * @type {Object}
 */
Login.propTypes = {
  onChange: PropTypes.func
}

/**
 * Export component
 */
export default Login;
