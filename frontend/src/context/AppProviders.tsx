import React, { FC } from 'react';
import { AuthProvider } from './AuthContext';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { API_URL } from '../config/config';

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

const AppProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
};
export default AppProviders;
