import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { FC, useCallback, useEffect } from 'react';
import {
  LOGIN,
  LoginResponse,
  LoginVariables,
  REGISTER,
  RegisterResponse,
  RegisterVariables,
} from '../graphQL/mutations/user';
import { errorToast, successToast } from '../utils/toasts';

type AuthStatus = 'initialising' | 'authenticated' | 'unauthenticated';

type UserType = {
  username: string;
};

type AuthContext = {
  status: AuthStatus;
  user: UserType | null;
  login: (login: string, password: string) => void;
  register: (
    user: string,
    surname: string,
    email: string,
    username: string,
    password: string,
    repeatPassword: string
  ) => void;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
};

const AuthContext = React.createContext<AuthContext>({
  status: 'initialising',
  user: null,
  login: () => null,
  logout: () => null,
  register: () => null,
  isLoading: false,
  token: null,
});

type AuthProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProps> = ({ children }) => {
  const [status, setStatus] = React.useState<AuthStatus>(
    localStorage.getItem('token') ? 'authenticated' : 'unauthenticated'
  );
  const [user, setUser] = React.useState<UserType | null>(null);
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem('token') || null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const handleError = (error: string) => {
    errorToast(error);
    setStatus('unauthenticated');
  };

  const setTokenHandler = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  useEffect(()=>{
    console.log(user)
  },[user])

  const [refetchLogin] = useMutation<LoginResponse, LoginVariables>(LOGIN);

  const login = useCallback((login: string, password: string) => {
    setIsLoading(true);
    refetchLogin({ variables: { input: { login, password } } }).then(
      ({data}) => {
        if(data){
          const user = data.login.user;
          successToast(`You were correctly logged in ${user.email}`);
          setTokenHandler(data.login.token);
          setStatus('authenticated');
          console.log(user)
          setUser({ username: user.login! });
        }
      },
      error => handleError(error)
    )
    .catch(error => {
      handleError(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  const logout = () => {
    setIsLoading(true);
    successToast('You were correctly logged out');
    setToken(null);
    localStorage.removeItem('token');
    setStatus('unauthenticated');
    setUser(null);
    setIsLoading(false);
  };

  const [refetchRegister] = useMutation<RegisterResponse, RegisterVariables>(REGISTER);
  
  const register = useCallback(
    (
      name: string,
      surname: string,
      email: string,
      username: string,
      password: string,
      repeatPassword: string
    ) => {
      setIsLoading(true);

      refetchRegister({ variables: { input: { firstName:name, lastName:surname, email, login:username, password, repeatPassword } } }).then(
          ({ data }) => {
            console.log(data);
            if(data){
              const {user, token} = data.register;
              successToast(`You were correctly logged in ${user.email}`);
              successToast(
                `You were correctly registered ${user.login}.`
              );
              setTokenHandler(token);
              setStatus('authenticated');
              setUser({ username: user.login });
            }
          },
          error => handleError(error)
        )
        .catch(error => {
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{ status, user, login, logout, register, isLoading, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
