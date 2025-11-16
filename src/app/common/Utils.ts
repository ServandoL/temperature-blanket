import { ApolloQueryResult } from '@apollo/client';

export class Utils {
  static handleQueryError<T>(result: ApolloQueryResult<T>): ApolloQueryResult<T> {
    if (result.error || result.errors?.length) {
      if (result.error) {
        console.error('GraphQL Error:', result.error);
        throw result.error;
      } else {
        console.error('GraphQL Errors:', result.errors);
        throw new Error('GraphQL Errors: ' + JSON.stringify(result.errors));
      }
    }
    return result;
  }
}
