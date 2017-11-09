import React, { PureComponent } from 'react';
import Card from 'react-md-card';
import Fab from 'react-md-fab';
import ProgressBar from 'react-md-progress-bar';
import { Link } from 'found';
import { Table, Tr, TrHeader, Th, Td, ColumnLink } from '../../styles/global';
import Request from '../../helpers/Request';

class List extends PureComponent {

  /**
   * React component constructor
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      progressBar: false,
    };
  }

  componentWillMount() {
    this.httpRequest();
  }

  /**
   * Http Request
   */
  httpRequest() {
    this.setState({
      progressBar: true
    });

    // instance request
    const request = new Request();

    // response
    const fields = [
      {
        field: 'id'
      },
      {
        field: 'payment_date'
      },
      {
        field: 'payment_amount'
      },
      {
        field: 'discount_amount'
      },
      {
        field: 'invoice_number'
      },
      {
        field: 'payment_type_quantity'
      }
    ];

    request.query('payments', fields).then((result) => {
      this.setState({
        progressBar: false,
        records: result.data.disciplines
      });
    });
  }

  renderBody() {
    let list = null;
    if (this.state.records) {
      list = this.state.records.map((item, index) => {
        return (
            <Tr key={index}>
              <Td>
                <Link className={ColumnLink} to={`/disciplines/${item.id}/update`}>
                  {item.name}
                </Link>
              </Td>
              <Td>
                <Link className={ColumnLink} to={`/disciplines/${item.id}/update`}>
                  {item.cost}
                </Link>
              </Td>
              <Td>
                <Link className={ColumnLink} to={`/disciplines/${item.id}/update`}>
                  {item.limit}
                </Link>
              </Td>
            </Tr>
        );
      });
    }

    return (
      <tbody>
        {list}
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <ProgressBar show={this.state.progressBar} overlay={this.state.progressBar} />
        <Card noPadding={true}>
          <Table>
            <thead>
              <TrHeader>
                <Th>Fecha</Th>
                <Th>Cliente</Th>
                <Th>Disciplina</Th>
                <Th>Tipo de pago</Th>
                <Th>Método de pago</Th>
                <Th>Monto</Th>
                <Th>Descuento</Th>
                <Th>Total facturado</Th>
              </TrHeader>
            </thead>
            {this.renderBody()}
          </Table>
        </Card>
        <Link to="/billing/create">
          <Fab onClick={() => {}} />
        </Link>
      </div>
    );
  }
};

/**
 * Export component
 */
export default List;
