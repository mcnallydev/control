import React, { PureComponent } from 'react';
import Card from 'react-md-card';
import Fab from 'react-md-fab';
import ProgressBar from 'react-md-progress-bar';
import { Link } from 'found';
import Header from '../master/header';
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
        field: 'name'
      },
      {
        field: 'cost'
      },
      {
        field: 'days'
      },
      {
        field: 'active'
      }
    ];

    request.query('paymentTypes', fields).then((result) => {
      this.setState({
        progressBar: false,
        records: result.data.payment_types
      });
    });
  }

  renderBody() {
    const list = this.state.records.map((item, index) => {
      return (
          <Tr key={index}>
            <Td>
              <Link className={ColumnLink} to={`/payment_types/${item.id}/update`}>
                {item.name}
              </Link>
            </Td>
            <Td>
              <Link className={ColumnLink} to={`/payment_types/${item.id}/update`}>
                {item.cost}
              </Link>
            </Td>
            <Td>
              <Link className={ColumnLink} to={`/payment_types/${item.id}/update`}>
                {item.days}
              </Link>
            </Td>
          </Tr>
      );
    });

    return (
      <tbody>
        {list}
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <Header title="Disciplinas"></Header>
        <ProgressBar show={this.state.progressBar} overlay={this.state.progressBar} />
        <Card noPadding={true}>
          <Table>
            <thead>
              <TrHeader>
                <Th>Nombre</Th>
                <Th>Precio</Th>
                <Th>Límite de participantes</Th>
              </TrHeader>
            </thead>
            {this.renderBody()}
          </Table>
        </Card>
        <Link to="/disciplines/create">
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
