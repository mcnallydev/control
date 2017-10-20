import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md-button';
import Card from 'react-md-card';
import Input from 'react-md-input';
import ProgressBar from 'react-md-progress-bar';
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
      form : Object.assign({},this.state.form , {[key]: event.target.value})
    });
  }

  onClick = () => {
    this.setState({
      progressBar: true
    })
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
                  disabled={false}
                  label="Entrar"
                  onClick={ () => this.onClick(this) }
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
