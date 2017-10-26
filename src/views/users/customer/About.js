import React, { PureComponent } from 'react';
import Button from 'react-md-button';
import Card from 'react-md-card';
import Input from 'react-md-input';
import ProgressBar from 'react-md-progress-bar';
import styled from 'react-emotion';
import Notifications, {notify} from 'react-notify-toast';
import Request from '../../../helpers/Request';
import Profile from '../../../components/user/Profile';
import Birthday from '../../../components/master/birthday';
import Selectable from '../../../components/master/selectable'

export const Buttons = styled.div`
  margin: 20px;
  text-align: right;
`;
export const Section = styled.div`
  position: relative;
  margin: 0 auto;
  width: 600px;
`;

export const Title = styled.h1`
  margin 20px 20px 0 20px;
  font-size: 14px;
`;

export const FormGroup = styled.div`
  position: relative;
  overflow: visible;
  margin-bottom: 25px;
`;

export const FormLabel = styled.h1`
  font-size: 11px;
  color: #4285f4;
  padding-top: ${props => props.isInput ? '20px' : '0'};
`;

export const FormInput = styled.div`
  float: left;
  width: ${props => props.width};
  position: relative;
`;

class ViewAbout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progressBar: false,
      sex: '',
    };
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
        field: 'email'
      },
      {
        field: 'active'
      },
      {
        field: 'birthdate'
      },
      {
        field: 'number_of_children'
      },
      {
        field: 'address'
      },
      {
        field: 'sex'
      },
      {
        field: 'size'
      },
      {
        field: 'mobile_number'
      },
      {
        field: 'home_number'
      },
      {
        field: 'office_number'
      },
      {
        field: 'education_level'
      },
      {
        field: 'current_activity'
      },
      {
        field: 'educational_center'
      },
      {
        field: 'work_center'
      },
      {
        field: 'grade'
      },
      {
        field: 'charge'
      }
    ];

    // arguments
    const args = [
      {
        field: 'id',
        value: this.props.params.id
      }
    ]

    request.query('user', fields, args).then((result) => {
      let states = {};;
      for (let key in result.data.user) {
        let value = (result.data.user[key] !== null) ? result.data.user[key] : '';
        if (result.data.user.hasOwnProperty(key)) {
          states[key] = `${value}`;
        }
      }
      states.progressBar = false;
      this.setState(states);
    }).catch((error) => {
      this.setState({
        progressBar: false,
        error: error.graphQLErrors[0].message
      });
    });
  }

  onChange = (value, key) => {
    let stateValue = (value.hasOwnProperty('target')) ? value.target.value : value;
    this.setState({
      [key]: stateValue
    });
  }

  /**
   * Button OnClick
   */
  onClick = () => {
    const request = new Request();

    this.setState({
      progressBar: true
    });

    // inputs
    const inputs =  [
      {
        field: 'id',
        value: this.props.params.id,
      },
      {
        field: 'birthdate',
        value: this.state.birthdate,
      },
      {
        field: 'address',
        value: this.state.address,
      },
    ];

    // number_of_children
    if (this.state.number_of_children !== '') {
      inputs.push({
        field: 'number_of_children',
        value: parseInt(this.state.number_of_children, 0)
      });
    }

    // sex
    if (this.state.sex !== '') {
      inputs.push({
        field: 'sex',
        value: parseInt(this.state.sex, 2)
      });
    }

    // size
    if (this.state['size'] !== '') {
      inputs.push({
        field: 'size',
        value: parseInt(this.state['size'], 3)
      });
    }

    // mobile_number
    if (parseInt(this.state.mobile_number, 0) && this.state.mobile_number.length === 8) {
      inputs.push({
        field: 'mobile_number',
        value: parseInt(this.state.mobile_number, 0)
      });
    }

    // office_number
    if (parseInt(this.state.office_number, 0) && this.state.office_number.length <= 15) {
      inputs.push({
        field: 'office_number',
        value: parseInt(this.state.office_number, 0)
      });
    }

    // home_number
    if (parseInt(this.state.home_number, 0) && this.state.home_number.length === 8) {
      inputs.push({
        field: 'home_number',
        value: parseInt(this.state.home_number, 0)
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
      notify.show('Información actualizada correctamente.', 'success');
      console.log(result);
      this.setState({
        progressBar: false
      });
    }).catch((error) => {
      this.setState({
        progressBar: false
      });
      console.log(error.graphQLErrors);
    });
  }

  render() {
    return (
      <Profile
        id={parseInt(this.props.params.id, 10)}
        tabSelected="3"
        title="Información"
      >
        <Notifications />
        <ProgressBar show={this.state.progressBar} overlay={this.state.progressBar} />
        <Section>
          <Title>Datos personales</Title>
          <Card>
            <FormGroup>
              <FormLabel>Fecha de nacimiento:</FormLabel>
              <Birthday identifier="birthdate" onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Input
                label="Dirección"
                type="text"
                value={this.state.address}
                onChange={ (e) => this.onChange(e, 'address') }
              />
            </FormGroup>
          </Card>
        </Section>

        <Section>
          <Title>Cantidad de hijos</Title>
          <Card noPadding={true}>
            <Selectable
              width="93.3px"
              value={this.state.number_of_children}
              selected="0"
              identifier="number_of_children"
              onClick={this.onChange}
            >
              0
            </Selectable>
            <Selectable
              width="93.3px"
              value={this.state.number_of_children}
              selected="1"
              identifier="number_of_children"
              onClick={this.onChange}
            >
              1
            </Selectable>
            <Selectable
              width="93.3px"
              value={this.state.number_of_children}
              selected="2"
              identifier="number_of_children"
              onClick={this.onChange}
            >
              2
            </Selectable>
            <Selectable
              width="93.3px"
              value={this.state.number_of_children}
              selected="3"
              identifier="number_of_children"
              onClick={this.onChange}
            >
              3
            </Selectable>
            <Selectable
              width="93.3px"
              value={this.state.number_of_children}
              selected="4"
              identifier="number_of_children"
              onClick={this.onChange}
            >
              4
            </Selectable>
            <Selectable
              width="93.3px"
              value={this.state.number_of_children}
              selected="5"
              identifier="number_of_children"
              onClick={this.onChange}
            >
              5
            </Selectable>
          </Card>
        </Section>

        <Section>
          <Title>Sexo</Title>
          <Card noPadding={true}>
            <Selectable
              width="280px"
              value={this.state.sex}
              selected="0"
              identifier="sex"
              onClick={this.onChange}
            >
              <i className="fa fa-mars fa-fw" aria-hidden="true"></i> HOMBRE
            </Selectable>
            <Selectable
              width="280px"
              value={this.state.sex}
              selected="1"
              identifier="sex"
              onClick={this.onChange}
            >
              <i className="fa fa-venus fa-fw" aria-hidden="true"></i> MUJER
            </Selectable>
          </Card>
        </Section>

        <Section>
          <Title>Talla</Title>
          <Card noPadding={true}>
            <Selectable
              width="186.6px"
              value={this.state.size}
              selected="0"
              identifier="size"
              onClick={this.onChange}
            >
              SMALL
            </Selectable>
            <Selectable
              width="186.6px"
              value={this.state.size}
              selected="1"
              identifier="size"
              onClick={this.onChange}
            >
              MEDIUM
            </Selectable>
            <Selectable
              width="186.6px"
              value={this.state.size}
              selected="2"
              identifier="size"
              onClick={this.onChange}
            >
              LARGE
            </Selectable>
          </Card>
        </Section>

        <Section>
          <Title>Contacto</Title>
          <Card>
            <FormGroup>
              <Input
                label="Número de celular"
                type="text"
                value={this.state.mobile_number}
                onChange={ (e) => this.onChange(e, 'mobile_number') }
                pattern="patternNumber"
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Número de casa"
                type="text"
                value={this.state.home_number}
                onChange={ (e) => this.onChange(e, 'home_number') }
                pattern="patternNumber"
              />
            </FormGroup>
            <FormGroup>
              <Input
                label="Número de oficina"
                type="text"
                value={this.state.office_number}
                onChange={ (e) => this.onChange(e, 'office_number') }
                pattern="patternNumber"
              />
            </FormGroup>
          </Card>
        </Section>

        <Section>
          <Buttons>
            <Button
              primary={true}
              label="Guardar"
              onClick={ this.onClick }
            />
          </Buttons>
        </Section>
      </Profile>
    );
  }
}

/**
 * Export component
 */
export default ViewAbout;
