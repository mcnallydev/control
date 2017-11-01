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
        field: 'active'
      }
    ];

    request.query('paymentMethods', fields).then((result) => {
      this.setState({
        progressBar: false,
        records: result.data.paymentMethods
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
                <Link className={ColumnLink} to={`/payment_methods/${item.id}/update`}>
                  {item.name}
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
                <Th>Nombre</Th>
              </TrHeader>
            </thead>
            {this.renderBody()}
          </Table>
        </Card>
        <Link to="/payment_methods/create">
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
