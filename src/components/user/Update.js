import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'found';
import Input from 'react-md-input';
import Card from 'react-md-card';
import ProgressBar from 'react-md-progress-bar';
import Switch from 'react-md-switch';
import Button from 'react-md-button';
import { Wrapper, ButtonsContainer, LinkClassName, ButtonContainer, Error } from './styles';
import Header from '../master/header';
import Request from '../../helpers/Request';


class Update extends PureComponent {
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
        active: false,
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

  componentWillMount() {
    this.httpFetch();
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

  onChangeActive = (e, active) => {
    const { form } = this.state;
    const newForm = {
      ...form,
      active: active
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
          if (emailStatus) {
            this.httpRequest();
          }
        });
      }
    });
  }

  /**
   * To set states based graphQL
   */
  httpFetch() {
    this.setState({
      progressBar: true,
    });

    // instance request
    const request = new Request();

    // response
    const fields = [
      {
        field: 'name'
      },
      {
        field: 'email'
      },
      {
        field: 'active'
      }
    ];

    // arguments
    const args = [
      {
        field: 'id',
        value: this.props.id
      }
    ]

    request.query('user', fields, args).then((result) => {
      const { form } = this.state;
      const newForm = {
        ...form,
        name: result.data.user.name,
        email: result.data.user.email,
        active: result.data.user.active
      };
      this.setState({
        progressBar: false,
        form: newForm
      });
    }).catch((error) => {
      this.setState({
        progressBar: false,
        error: error.graphQLErrors[0].message
      });
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
        field: 'id',
        value: this.props.id,
      },
      {
        field: 'name',
        value: this.state.form.name,
      },
      {
        field: 'email',
        value: this.state.form.email,
      },
      {
        field: 'active',
        value: this.state.form.active,
      }
    ];

    // include change password if don't is empty
    if (this.state.form.password !== '') {
      inputs.push({
        field: 'password',
        value: this.state.form.password,
      });
    }

    // response
    const fields = [
      {
        field: 'user',
        fields: [
          {
            field: 'id'
          }
        ]
      }
    ];

    // make http request
    request.mutate('UserUpdate', 'userUpdate', inputs, fields, false).then((result) => {
      window.location = `/users/${this.props.userType}`
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
        <Header title={`Actualizar al usuario ${this.props.title} ${this.state.form.name}`}></Header>
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
            <Switch
              id={'switch'}
              checked={this.state.form.active}
              onChange={this.onChangeActive}
            />
            <ButtonsContainer>
              <ButtonContainer>
                <Button onClick={ this.onClick } primary={true} label="Actualizar" />
              </ButtonContainer>
              <Link to={`/users/${this.props.userType}`} className={LinkClassName} exact>
                Cancelar
              </Link>
            </ButtonsContainer>
          </Card>
        </Wrapper>
      </div>
    );
  }
}

Update.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userType: PropTypes.oneOf([
    'admin',
    'coach',
    'customer'
  ]),
};

/**
 * Export component
 */
export default Update;
