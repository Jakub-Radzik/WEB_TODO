import { FC, useCallback, useState,useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginView } from '../components/LoginView';
import { useAuth } from '../context/AuthContext';
import { GRAY, MAXIMUM_RED_PURPLE } from '../design/colors';
import { Button, TertiaryButton } from '../elements/button';
import {
  LeftWrapper,
  LoginContainer,
  Row,
  Wrapper,
} from '../elements/containers';
import { Input } from '../elements/form';
import Loader from '../elements/loader';
import { PrimaryText, Text } from '../elements/text';
import { errorToast } from '../utils/toasts';
import PATH from '../utils/router/paths';

type RegisterDataProps = {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
};

const emptyRegisterData: RegisterDataProps = {
  name: '',
  surname: '',
  email: '',
  username: '',
  password: '',
  repeatPassword: '',
};

const Register = () => {
  const { register, isLoading } = useAuth();

  const [registerData, setRegisterData] =
    useState<RegisterDataProps>(emptyRegisterData);


  const navigate = useNavigate();

  const isValid = useCallback(() => {
    return (
      registerData.name &&
      registerData.surname &&
      registerData.email &&
      registerData.username &&
      registerData.password &&
      registerData.repeatPassword
    );
  }, [registerData]);

  const onSubmit = () => {
    if (registerData.password !== registerData.repeatPassword) {
      errorToast('Passwords do not match');
      return;
    } else {
      register(
        registerData.name,
        registerData.surname,
        registerData.email,
        registerData.username,
        registerData.password,
        registerData.repeatPassword
      )
    }
  };

  return (
    <LoginContainer>
      <LoginView>
        {isLoading && <Loader />}
        <LeftWrapper>
          <PrimaryText color={MAXIMUM_RED_PURPLE}>Register</PrimaryText>
          <Text color={GRAY} align="left">
            Welcome! Create an account and become a better version of yourself.
          </Text>
        </LeftWrapper>
        <Wrapper>
          <Row>
            <Input
              placeholder="Name"
              value={registerData.name}
              onChange={(value: string) =>
                setRegisterData({ ...registerData, name: value })
              }
              type="text"
            />
            <Input
              placeholder="Surname"
              value={registerData.surname}
              onChange={(value: string) =>
                setRegisterData({ ...registerData, surname: value })
              }
              type="text"
            />
          </Row>
          <Input
            value={registerData.email}
            onChange={(value: string) =>
              setRegisterData({ ...registerData, email: value })
            }
            placeholder="E-mail"
            type="email"
          />
          <Input
            value={registerData.username}
            onChange={(value: string) =>
              setRegisterData({ ...registerData, username: value })
            }
            placeholder="Username"
            type="text"
          />
          <Input
            value={registerData.password}
            onChange={(value: string) =>
              setRegisterData({ ...registerData, password: value })
            }
            placeholder="Password"
            type="password"
          />
          <Input
            value={registerData.repeatPassword}
            onChange={(value: string) =>
              setRegisterData({ ...registerData, repeatPassword: value })
            }
            placeholder="Repeat password"
            type="password"
          />
        </Wrapper>
        <Wrapper margin="50px 0 0 0">
          <Button
            label={'Create account'}
            onClick={() => {
              isValid() && onSubmit();
            }}
            disabled={!isValid() || isLoading}
          />
        </Wrapper>
        <Wrapper margin="50px 0 0 0">
          <Text color="#000">Already have an account ?</Text>
            <TertiaryButton label={'Login'} onClick={()=>{navigate(PATH.LOGIN)}} />
        </Wrapper>
      </LoginView>
    </LoginContainer>
  );
};

export default Register;
