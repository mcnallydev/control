import React, { PureComponent } from 'react';
//import Input from 'react-md-input';
import Card from 'react-md-card';
import styled from 'react-emotion';
import Request from '../../helpers/Request';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 500px;
`;

const Search = styled.div`
  position: relative;
  overflow: hidden;
`;

const Results = styled.div`
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(0,0,0,0.12);
`;

const CustomerItem = styled.div`
  width: 100%;
  float: left;
  padding: 12px;
  &:hover {
    background-color: #eeeeee;
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

const Input = styled.input`
  padding: 10px 10px 10px 40px;
  font-size: 18px;
  width: 100%;
  outline: 0;
  border: 0;
  font-weight: 400;
  text-transform: uppercase;
  color: #3b88c3;
`;

const SearchIcon = styled.i`
  position: absolute;
  top: 9px;
  left: 10px;
  font-size: 22px;
  color: #3b88c3;
`;

const iconSearch = 'fa fa-search';
const iconLoading = 'fa fa-circle-o-notch fa-spin';

class Customer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchIcon: iconSearch,
      customers: []
    };
  }

  onChange = (event) => {

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
      }
    ];

    const inputs = [
      {
        field: 'query',
        value: event.target.value
      },
      {
        field: 'filter',
        value: [
          'name',
          'email'
        ]
      }
    ];

    // set loading icon
    this.setState({
      searchIcon: iconLoading
    });

    request.query('userSearch', fields, inputs).then((result) => {
      this.setState({
        customers: result.data.userSearch,
        searchIcon: iconSearch
      });
    });

    this.setState({
      query: event.target.value
    })
  }

  renderList() {
    let list = null;
    if (this.state.customers) {
      list = this.state.customers.map((customer, index) => {
        return (
          <CustomerItem key={index} onClick={(e) => this.props.onClick(customer)}>
            <Icon className="material-icons">account_circle</Icon>
            <Info>
              <Name>{customer.name}</Name>
              <Email>{customer.email}</Email>
            </Info>
          </CustomerItem>
        );
      });
    }

    return (
      <Results>
        {list}
      </Results>
    );
  }

  render() {
    return (
      <Wrapper>
        <Card noPadding={true}>
          <Search>
            <SearchIcon className={this.state.searchIcon}></SearchIcon>
            <Input
              autoFocus
              placeholder="Nombre del cliente"
              value={this.state.query}
              onChange={ this.onChange }
            />
          </Search>
          {this.renderList()}
        </Card>
      </Wrapper>
    );
  }
}

/**
 * Export component
 */
export default Customer;
