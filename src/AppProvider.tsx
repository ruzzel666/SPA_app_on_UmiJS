import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import type { ReactNode } from 'react';

const TOKEN_KEY = 'auth_token';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

const httpLink = createHttpLink({
  uri: 'https://localhost:7273/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

const authLink = setContext((_, { headers }) => {
  const token = getAuthToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'AUTH_NOT_AUTHENTICATED') {
        console.warn('Требуется авторизация');
        return;
      }
    }
  }

  if (networkError) {
    console.error('Network error:', networkError);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  connectToDevTools: true,
});

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
