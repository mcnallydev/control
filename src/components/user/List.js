import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'found';
import Card from 'react-md-card';
import Fab from 'react-md-fab';
import ProgressBar from 'react-md-progress-bar';
import styled, { css } from 'react-emotion';
import Header from '../master/header';
import Tabs from '../master/tabs';
import Request from '../../helpers/Request';
import usersTabs from './usersTabs.json';

const LinkClassName = css`
  width: 100%;
  float: left;
  padding: 12px;
  &:hover {
    background-color: #dadada;
    cursor: pointer;
  }
`;

const Icon = styled.i`
  font-size: 48px;
  float: left;
  margin-right: 10px;
`;

const Info = styled.div`
  position: relative;
  overflow: hidden;
  float: left;
`;

const Name = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 18px;
  color: #333333;
`;

const Email = styled.span`
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #737373;
`;

class List extends PureComponent {
  /**
   * React component constructor
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      progressBar: false,
    };

  }

  componentWillMount() {
    this.httpRequest()
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
        field: 'email'
      },
      {
        field: 'active'
      }
    ];

    request.query(this.props.fieldName, fields).then((result) => {
      this.setState({
        progressBar: false,
        users: result.data[this.props.fieldName]
      });
    });
  }

  renderList() {
    let pathEnd = (this.props.userType === 'customer') ? '/payments' : '/update';
    let users = this.state.users.map((user, index) => {
      return (
        <Link key={index} className={LinkClassName} to={`/users/${this.props.userType}/${user.id}${pathEnd}`}>
          <Icon className="material-icons">account_circle</Icon>
          <Info>
            <Name>{user.name}</Name>
            <Email>{user.email}</Email>
          </Info>
        </Link>
      );
    });
    return (users);
  }

  render() {
    return (
      <div>
        <Header title={this.props.title}></Header>
        <Tabs items={usersTabs} selected={this.props.tabSelected} />
        <ProgressBar show={this.state.progressBar} overlay={this.state.progressBar} />
        <Card noPadding={true}>
          {this.renderList()}
        </Card>
        <Link to={`/users/${this.props.userType}/create`}>
          <Fab onClick={() => {}} />
        </Link>
      </div>
    );
  }
}

List.propTypes = {
  fieldName: PropTypes.oneOf([
    'userAdmins',
    'userCoaches',
    'userCustomers'
  ]),
  tabSelected: PropTypes.oneOf([
    '0',
    '1',
    '2'
  ]),
  title: PropTypes.string.isRequired,
  userType: PropTypes.oneOf([
    'admin',
    'coach',
    'customer'
  ]),
};

/**
 * Export component
 */
export default List;
