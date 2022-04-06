import React, { FC } from 'react';

const UserContext = React.createContext(null);

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const user = null;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
