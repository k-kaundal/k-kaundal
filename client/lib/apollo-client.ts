import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink } from '@apollo/client';

const requestLogger = new ApolloLink((operation, forward) => {
//   console.log('GraphQL Request:', {
//     operationName: operation.operationName,
//     query: operation.query.loc?.source.body,
//     variables: operation.variables,
//     headers: operation.getContext().headers,
//   });
  return forward(operation).map((response) => {
    // console.log('GraphQL Response:', {
    //   operationName: operation.operationName,
    //   data: response.data,
    //   errors: response.errors,
    //   extensions: response.extensions,
    // });
    return response;
  });
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    // graphQLErrors.forEach(({ message, locations, path }) =>
    // //   console.error(
    // //     `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}, Operation: ${operation.operationName}`
    // //   )
    // );
  }
  if (networkError) {
    // console.error(`[Network error]: ${networkError.message}, Operation: ${operation.operationName}, Status: ${(networkError as any)?.statusCode}, Body: ${(networkError as any)?.bodyText}, Result: ${(networkError as any)?.result}`);
  }
});

const httpLink = new HttpLink({
  uri: 'https://kaundal.vip/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(requestLogger).concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;