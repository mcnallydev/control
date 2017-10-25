import React, { PureComponent } from 'react';
import Card from 'react-md-card';
import Input from 'react-md-input';
import styled from 'react-emotion';
import Profile from '../../../components/user/Profile';
import Birthday from '../../../components/master/birthday';

export const Section = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  width: 600px;
`;

export const Title = styled.h1`
  margin 20px 20px 0 20px;
  font-size: 16px;
`;

export const FormGroup = styled.div`
  position: relative;
  overflow: hidden;
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
      birthday: '',
      numberOfChildren: '',
    };
  }

  onChange = (value, key) => {
    let stateValue = (value.hasOwnProperty('target')) ? value.target.value : value;
    this.setState({
      [key]: stateValue
    });
  }

  render() {
    return (
      <Profile
        id={parseInt(this.props.params.id, 10)}
        tabSelected="3"
        title="Información"
      >
        <Section>
          <Title>Datos Personales</Title>
          <Card>
            <FormGroup>
              <FormLabel>Fecha de nacimiento:</FormLabel>
              <Birthday identifier="birthday" onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Input
                label="Nº de Hijos"
                type="text"
                value={this.state.numberOfChildren}
                pattern={'patternInteger'}
                onChange={ (e) => this.onChange(e, 'numberOfChildren') }
              />
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
      </Profile>
    );
  }
}

/**
 * Export component
 */
export default ViewAbout;
