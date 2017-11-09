import React, { PureComponent } from 'react';
import Card from 'react-md-card';
import ProgressBar from 'react-md-progress-bar';
import Fab from 'react-md-fab';
import { Link } from 'found';
import moment from 'moment';
import 'moment/locale/es';
import Profile from '../../../components/user/Profile';
import Request from '../../../helpers/Request';
import { Table, Tr, Th, Td, SubText } from '../../../styles/global';

moment.locale('es');

class ViewAbout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progressBar: false,
      records: []
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
        field: 'weight'
      },
      {
        field: 'pants_size'
      },
      {
        field: 'chest'
      },
      {
        field: 'waist'
      },
      {
        field: 'biceps'
      },
      {
        field: 'created_at'
      }
    ];

    const args = [
      {
        field: 'user_id',
        value: this.props.params.id
      }
    ];

    request.query('progressList', fields, args).then((result) => {
      this.setState({
        progressBar: false,
        records: result.data.progressList
      });
    });
  }

  renderBody() {
    const list = this.state.records.map((item) => {
      return (
        <Tr>
          <Td>{moment(item.created_at).format('LL')}</Td>
          <Td>{item.weight}<SubText>lbs</SubText></Td>
          <Td>{item.pants_size}<SubText>pulg</SubText></Td>
          <Td>{item.chest}<SubText>cm</SubText></Td>
          <Td>{item.waist}<SubText>cm</SubText></Td>
          <Td>{item.biceps}<SubText>cm</SubText></Td>
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
      <Profile
        id={parseInt(this.props.params.id, 10)}
        tabSelected="2"
        title="Progreso"
      >
        <ProgressBar show={this.state.progressBar} overlay={this.state.progressBar} />
        <Card noPadding={true}>
          <Table>
            <thead>
              <Tr>
                <Th>Fecha</Th>
                <Th>Peso</Th>
                <Th>Talla de pantalón</Th>
                <Th>Pecho</Th>
                <Th>Cintura</Th>
                <Th>Bíceps</Th>
              </Tr>
            </thead>
            {this.renderBody()}
          </Table>
        </Card>
        <Link to={`/users/customer/${this.props.params.id}/progress/create`}>
          <Fab onClick={() => {}} />
        </Link>
      </Profile>
    );
  }
}

/**
 * Export component
 */
export default ViewAbout;
