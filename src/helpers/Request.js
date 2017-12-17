import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';
import Cookies from 'js-cookie';
import Field from './Field';

class Request {

  constructor(tenant) {
    let self = this;
    this.tentant = tenant || Cookies.get('Tenant');
    this.token = Cookies.get('Authorization');
    this.client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: `http://${self.tentant.toLowerCase()}.control.fitness`,
        opts: {
          headers: {
            'authorization': self.token
          }
        }
      })
    });
  }

  /**
   * Query
   * @param  {String} fieldNamen
   * @param  {[]} fields
   * @return {Promise}
   */
  query(fieldName, fields, args) {
    let queryArgs = args || [];
    const queryString = Field.query(fieldName, fields, queryArgs);

    return this.client.query({
      query: gql`${queryString}`
    });
  }

  /**
   * Mutate
   * @param  {String} mutationName
   * @param  {String} fieldName
   * @param  {[]} inputs
   * @param  {[]} fields
   * @return {Promise}
   */
  mutate(mutationName, fieldName, inputs, fields, isRoot) {
    const mutateString = Field.mutate(mutationName, fieldName, inputs, fields, isRoot);

    return this.client.mutate({
      mutation: gql`${mutateString}`
    });
  }

}

export default Request;
