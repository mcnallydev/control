import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'found';
import Input from 'react-md-input';
import Card from 'react-md-card';
import ProgressBar from 'react-md-progress-bar';
import Button from 'react-md-button';
import Switch from 'react-md-switch';
import { Wrapper, ButtonsContainer, LinkClassName, ButtonContainer, Error } from '../../styles/global';
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
        description: '',
        cost: '',
        limit: '',
        active: false
      },
      errors: {
        name: '',
        description: '',
        cost: '',
        limit: '',
        active: false
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
        field: 'description'
      },
      {
        field: 'cost'
      },
      {
        field: 'limit'
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

    request.query('discipline', fields, args).then((result) => {
      const { form } = this.state;
      const newForm = {
        ...form,
        name: result.data.discipline.name,
        description: result.data.discipline.description,
        cost: `${result.data.discipline.cost}`,
        limit: `${result.data.discipline.limit}`,
        active: result.data.discipline.active
      };
      this.setState({
        progressBar: false,
        form: newForm
      });
    }).catch((error) => {
      this.setState({
        progressBar: false,
        error: error.graphQLErrors
      });
    });
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
        self.validateInput('description', (descriptionStatus) => {
          if (descriptionStatus) {
            self.validateInput('cost', (costStatus) => {
              if (costStatus) {
                self.validateInput('limit', (limitStatus) => {
                  if (limitStatus) {
                    this.httpRequest();
                  }
                });
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
        field: 'id',
        value: this.props.id,
      },
      {
        field: 'name',
        value: this.state.form.name,
      },
      {
        field: 'description',
        value: this.state.form.description,
      },
      {
        field: 'cost',
        value: parseFloat(this.state.form.cost),
      },
      {
        field: 'limit',
        value: parseInt(this.state.form.limit, 0),
      },
      {
        field: 'active',
        value: this.state.form.active
      }
    ];

    // response
    const fields = [
      {
        field: 'discipline',
        fields: [
          {
            field: 'id'
          }
        ]
      }
    ];

    // make http request
    request.mutate('DisciplineUpdate', 'disciplineUpdate', inputs, fields, false).then((result) => {
      window.location = '/disciplines';
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
        <Header title="Crear disciplina"></Header>
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
              label="Descripción"
              type="text"
              value={this.state.form.description}
              error={this.state.errors.description}
              onChange={ this.onChange('description') }
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
              label="Límite de participantes"
              type="text"
              value={this.state.form.limit}
              error={this.state.errors.limit}
              pattern="patternInteger"
              onChange={ this.onChange('limit') }
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
              <Link to="/disciplines" className={LinkClassName} exact>
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
  id: PropTypes.number.isRequired
};

/**
 * Export component
 */
export default Update;
