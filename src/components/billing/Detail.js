import React, { PureComponent } from 'react';
import Card from 'react-md-card';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import moment from 'moment';
import 'moment/locale/es';
import { Table } from '../../styles/global';

moment.locale('es');

const Label = styled.td`
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Value = styled.td`
  font-weight: bold;
  text-align: right;
  padding-top: 10px;
  padding-bottom: 10px;
`;

class Detail extends PureComponent {

  componentWillUpdate(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <Card>
        <Table>
          <tbody>
            <tr>
              <Label>Fecha de pago</Label>
              <Value>{moment(new Date(this.props.payment_date)).format('LL')}</Value>
            </tr>
            <tr>
              <Label>Valido hasta</Label>
              <Value>{moment(this.props.payment_date).add(90, 'days').format('LL')}</Value>
            </tr>
            <tr>
              <Label>Costo</Label>
              <Value>{this.props.cost}</Value>
            </tr>
            <tr>
              <Label>Total</Label>
              <Value>$150.00</Value>
            </tr>
          </tbody>
        </Table>
      </Card>
    );
  }

}

Detail.propTypes = {
  payment_date: PropTypes.string,
  cost: PropTypes.string
};

/**
 * Export component
 */
export default Detail;
