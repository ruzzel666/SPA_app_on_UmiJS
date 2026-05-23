import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import type { ReactNode } from 'react';

const TOKEN_KEY = 'auth_token';

const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

const httpLink = createHttpLink({
  uri: '/graphql',
  fetchOptions: { credentials: 'include' },
  ...(process.env.NODE_ENV === 'development' && {
    fetch: (input: RequestInfo, init?: RequestInit) => {
      console.log('[GraphQL Request]', input, init);
      return fetch(input, init);
    },
  }),
});

const authLink = setContext((_, { headers }) => {
  const token = getAuthToken();
  console.log('[Auth Link] Token present:', !!token);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
  console.log('[GraphQL Error] Operation:', operation?.operationName);
  console.log('[GraphQL Error] Variables:', operation?.variables);
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions, path }) => {
      console.error('[GraphQL Error]', {
        message,
        extensions,
        path,
      });
      if (extensions?.code === 'AUTH_NOT_AUTHENTICATED') {
        console.warn('Требуется авторизация');
      }
    });
  }
  if (networkError) {
    console.error('[Network Error]', networkError);
    console.error('[Network Error] Details:', {
      name: networkError.name,
      message: networkError.message,
      stack: networkError.stack,
    });
  }
  if (response) {
    console.log('[GraphQL Response]', response);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: { merge: (_, incoming) => incoming },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network', errorPolicy: 'all' },
    query: { fetchPolicy: 'network-only', errorPolicy: 'all' },
    mutate: { errorPolicy: 'all' },
  },
  connectToDevTools: true,
});

export default function AppProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
