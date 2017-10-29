import React, { PureComponent } from 'react';
import Card from 'react-md-card';
import { Link } from 'found';
import ProgressBar from 'react-md-progress-bar';
import Input from 'react-md-input';
import Button from 'react-md-button';
import Request from '../../../helpers/Request';
import Header from '../../../components/master/header';

import { Wrapper, ButtonsContainer, LinkClassName, ButtonContainer, Error } from '../../../styles/global';

class ViewProgressCreate extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        weight: '',
        pantsSize: '',
        chest: '',
        waist: '',
        biceps: '',
      },
      errors: {
        weight: '',
        pantsSize: '',
        chest: '',
        waist: '',
        biceps: '',
      },
      error: '',
      progressBar: false,
    };

    this.onClick = this.onClick.bind(this);
  }

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
        field: 'weight',
        value: parseFloat(this.state.form.weight),
      },
      {
        field: 'pants_size',
        value: parseFloat(this.state.form.pantsSize),
      },
      {
        field: 'chest',
        value: parseFloat(this.state.form.chest),
      },
      {
        field: 'waist',
        value: parseFloat(this.state.form.waist),
      },
      {
        field: 'biceps',
        value: parseFloat(this.state.form.biceps),
      },
      {
        field: 'user_id',
        value: parseInt(this.props.params.id, 0),
      }
    ];

    // response
    const fields = [
      {
        field: 'progress',
        fields: [
          {
            field: 'id'
          }
        ]
      }
    ];

    // make http request
    request.mutate('ProgressCreate', 'progressCreate', inputs, fields, false).then((result) => {
      window.location = `/users/customer/${this.props.params.id}/progress`
    }).catch((error) => {
      this.setState({
        progressBar: false,
        error: error.graphQLErrors[0].message
      });
    });
  }

  /**
   * Click action on button create
   */
  onClick() {
    this.validateInput('weight', (weightStatus) => {
      if (weightStatus) {
        this.validateInput('pantsSize', (pantsSizeStatus) => {
          if (pantsSizeStatus) {
            this.validateInput('chest', (chestStatus) => {
              if (chestStatus) {
                this.validateInput('waist', (waistStatus) => {
                  if (waistStatus) {
                    this.validateInput('biceps', (bicepsStatus) => {
                      this.httpRequest();
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }


  render() {
    return (
      <div>
        <Header title="Nuevo progreso"></Header>
        <ProgressBar show={this.state.progressBar} overlay={this.state.progressBar} />
        <Wrapper>
          <Error>{this.state.error}</Error>
          <Card>
            <Input
              label="Peso"
              type="text"
              value={this.state.form.weight}
              error={this.state.errors.weight}
              pattern="patternDecimal"
              onChange={ this.onChange('weight') }
            />
            <Input
              label="Talla de Pantalón"
              type="text"
              value={this.state.form.pantsSize}
              error={this.state.errors.pantsSize}
              pattern="patternDecimal"
              onChange={ this.onChange('pantsSize') }
            />
            <Input
              label="Pecho"
              type="text"
              value={this.state.form.chest}
              error={this.state.errors.chest}
              pattern="patternDecimal"
              onChange={ this.onChange('chest') }
            />
            <Input
              label="Cintura"
              type="text"
              value={this.state.form.waist}
              error={this.state.errors.waist}
              pattern="patternDecimal"
              onChange={ this.onChange('waist') }
            />
            <Input
              label="Bíceps"
              type="text"
              value={this.state.form.biceps}
              error={this.state.errors.biceps}
              pattern="patternDecimal"
              onChange={ this.onChange('biceps') }
            />
            <ButtonsContainer>
              <ButtonContainer>
                <Button onClick={ this.onClick } primary={true} label="Crear" />
              </ButtonContainer>
              <Link to={`/users/customer/${this.props.params.id}/progress`} className={LinkClassName} exact>
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
export default ViewProgressCreate;
