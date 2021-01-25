import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const TOKEN = 'TOKEN';
const token = localStorage.getItem(TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authToken = makeVar(token);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-JWT': authToken() || '',
    },
  };
});

const httpLink = createHttpLink({
  uri: 'https://nuber-eats-assignment.herokuapp.com/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Auth: {
        fields: {
          isLoggin: {
            read: () => {
              return isLoggedInVar();
            },
          },
          token: {
            read: () => {
              return authToken();
            },
          },
        },
      },
    },
  }),
});

export default client;
