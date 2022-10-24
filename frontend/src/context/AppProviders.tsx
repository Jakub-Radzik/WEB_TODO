import React, { FC } from 'react';
import { AuthProvider } from './AuthContext';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';
import { API_URL } from '../config/config';

const httpLink = new HttpLink({ uri: API_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? token : "",
    },
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

const AppProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
};
export default AppProviders;
