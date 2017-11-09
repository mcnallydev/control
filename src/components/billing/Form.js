import React, { PureComponent } from 'react';
import Menu from 'react-md-menu';
import Card from 'react-md-card';
import Input from 'react-md-input';
import { Link } from 'found';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import moment from 'moment';
import 'moment/locale/es';
import Birthday from '../master/birthday';
import Request from '../../helpers/Request';

import { FormInput, FormInputDropdown, FormInputDropdownLabel, LabelFlat, Label } from '../master/birthday/styles';

moment.locale('es');

const Wrapper = styled.div`
  margin: 0 auto;
  width: 500px;
  overflow: visible;
`;

const Title = styled.h1`
  margin 20px 20px 0 20px;
  font-size: 14px;
`;

class Form extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      birthdate: '',
      disciplineShow: false,
      disciplines: [],
      paymentTypes: [],
      labels: {
        discipline: 'Seleccionar',
        paymentType: 'Seleccionar'
      }
    }
  }

  componentDidMount() {
    this.setState({
      birthdate: moment(new Date()).format('DD/MM/YYYY')
    });

    this.fetchDisciplines();
    this.fetchPaymentTypes();
  }

  fetchDisciplines() {
    // instance request
    const request = new Request();

    const fields = [
      {
        field: 'id'
      },
      {
        field: 'name'
      }
    ];

    request.query('disciplines', fields).then((result) => {
      let disciplines = result.data.disciplines.map((item) => {
        return {
          label: item.name,
          value: item.id
        }
      });

      this.setState({
        disciplines: disciplines
      });
    });
  }

  fetchPaymentTypes() {
    // instance request
    const request = new Request();

    const fields = [
      {
        field: 'id'
      },
      {
        field: 'name'
      }
    ];

    request.query('paymentTypes', fields).then((result) => {
      let paymentTypes = result.data.paymentTypes.map((item) => {
        return {
          label: item.name,
          value: item.id
        }
      });

      this.setState({
        paymentTypes: paymentTypes
      });
    });
  }

  onChange = (value, key) => {

    // input component
    let stateValue = (value.hasOwnProperty('target')) ? value.target.value : value;

    // select component
    stateValue = (value.hasOwnProperty('label')) ? value.value : stateValue;

    // select component
    key = (value.hasOwnProperty('key')) ? value.key : key;

    console.log(key);
    console.log(stateValue);

    this.setState({
      [key]: stateValue.name
    });
  }

  onSelect = (option, identifier) => {
    console.log(option);
    console.log(identifier);

    let key = '';
    switch (identifier) {
      case 'discipline':
        key = 'disciplineShow';
        break;
      case 'paymentType':
        key = 'paymentTypeShow';
        break;
      default:
    }

    this.setState({
      labels : Object.assign({}, this.state.labels, {[identifier]: option.label}),
      [key]: false
    });
  }

  render() {
    return (
      <Wrapper>
        <Title><i className="fa fa-calendar" aria-hidden="true"></i> Fecha</Title>
        <Card overflowHidden={false}>
          <div>
            <Birthday
              current={this.state.birthdate}
              identifier="birthdate"
              onChange={this.onChange}
            />
          </div>
        </Card>

        <Title><i className="fa fa-user-circle-o" aria-hidden="true"></i> Cliente</Title>
        <Card>
          <div>{this.props.customer.name}</div>
        </Card>

        <Title><i className="fa fa-list-ul" aria-hidden="true"></i> Disciplina</Title>
        <Card>
          <LabelFlat
            onClick={() => {this.setState({disciplineShow: true})}}
          >
            {this.state.labels.discipline}
          </LabelFlat>
          <Menu
            identifier="discipline"
            open={this.state.disciplineShow}
            options={this.state.disciplines}
            onClick={this.onSelect}
          />
        </Card>

        <Title><i className="fa fa-list-ul" aria-hidden="true"></i> Tipo de pago</Title>
        <Card>
          <LabelFlat
            onClick={() => {this.setState({paymentTypeShow: true})}}
          >
            {this.state.labels.paymentType}
          </LabelFlat>
          <Menu
            identifier="paymentType"
            open={this.state.paymentTypeShow}
            options={this.state.paymentTypes}
            onClick={this.onSelect}
          />
        </Card>
      </Wrapper>
    );
  }
}

Form.propTypes = {
  customer: PropTypes.object
};

/**
 * Export component
 */
export default Form;
