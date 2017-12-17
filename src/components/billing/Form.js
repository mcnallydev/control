import React, { PureComponent } from 'react';
import Menu from 'react-md-menu';
import Card from 'react-md-card';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import moment from 'moment';
import 'moment/locale/es';
import Detail from './Detail';
import DropdownDate from '../master/date';
import Request from '../../helpers/Request';

import { LabelFlat } from '../master/birthday/styles';

moment.locale('es');

const Wrapper = styled.div`
  margin: 0 auto;
  overflow: visible;
`;

const Left = styled.div`
  width: 50%;
  float: left;
`;

const Right = styled.div`
  width: 50%;
  float: left;
`;

const Title = styled.h1`
  margin 20px 20px 0 20px;
  font-size: 14px;
`;

class Form extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      payment_date: '',
      cost: '0',
      disciplineShow: false,
      paymentTypeShow: false,
      paymentMethodShow: false,
      disciplines: [],
      paymentTypes: [],
      paymentMethods: [],
      labels: {
        discipline: 'Seleccionar',
        paymentType: 'Seleccionar',
        paymentMethod: 'Seleccionar'
      }
    }
  }

  componentDidMount() {
    this.setState({
      payment_date: moment(new Date()).format('YYYY/MM/DD')
    });
    this.fetchDisciplines();
    this.fetchPaymentTypes();
    this.fetchPaymentMethods();
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
      },
      {
        field: 'cost'
      },
      {
        field: 'days'
      }
    ];

    request.query('paymentTypes', fields).then((result) => {
      let paymentTypes = result.data.paymentTypes.map((item) => {
        return {
          label: item.name,
          value: item.id,
          cost: item.cost,
          days: item.days
        }
      });

      this.setState({
        paymentTypes: paymentTypes
      });
    });
  }

  fetchPaymentMethods() {
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

    request.query('paymentMethods', fields).then((result) => {
      let paymentMethods = result.data.paymentMethods.map((item) => {
        return {
          label: item.name,
          value: item.id
        }
      });

      this.setState({
        paymentMethods: paymentMethods
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

    this.setState({
      [key]: stateValue.name
    });
  }

  onSelect = (option, identifier) => {
    let key = '';
    switch (identifier) {
      case 'discipline':
        key = 'disciplineShow';
        break;
      case 'paymentType':
        key = 'paymentTypeShow';
        break;
      case 'paymentMethod':
        key = 'paymentMethodShow';
        break;
      default:
    }

    this.setState({
      labels : Object.assign({}, this.state.labels, {[identifier]: option.label}),
      [key]: false,
      cost: (option.hasOwnProperty('cost')) ? option.cost : '0',
      days: (option.hasOwnProperty('days')) ? option.days : '0'
    });
  }

  render() {
    return (
      <Wrapper>
        <Left>
          <Title><i className="fa fa-calendar" aria-hidden="true"></i> Fecha</Title>
          <Card overflowHidden={false}>
            <div>
              <DropdownDate
                current={this.state.payment_date}
                identifier="payment_date"
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

          <Title><i className="fa fa-list-ul" aria-hidden="true"></i> Métodos de pago</Title>
          <Card>
            <LabelFlat
              onClick={() => {this.setState({paymentMethodShow: true})}}
            >
              {this.state.labels.paymentMethod}
            </LabelFlat>
            <Menu
              identifier="paymentMethod"
              open={this.state.paymentMethodShow}
              options={this.state.paymentMethods}
              onClick={this.onSelect}
            />
          </Card>
        </Left>
        <Right>
          <Title><i className="fa fa-file-text-o" aria-hidden="true"></i> Detalle</Title>
          <Detail
            payment_date={this.state.payment_date}
            cost={this.state.cost}
          />
        </Right>
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
