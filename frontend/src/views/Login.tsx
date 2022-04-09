import { FC, useState } from 'react';
import { LoginView } from '../components/LoginView';
import { useAuth } from '../context/AuthContext';
import {
  GRAY,
  MAXIMUM_RED_PURPLE,
} from '../design/colors';
import { Button, TertiaryButton } from '../elements/button';
import { LeftWrapper, LoginContainer, Wrapper } from '../elements/containers';
import { Input } from '../elements/form';
import { PrimaryText, Text } from '../elements/text';

type LoginDataProps = {
  username: string;
  password: string;
};

const Login: FC<{switchView: ()=>void}> = ({switchView}) => {
  const { login } = useAuth();

  const [loginData, setLoginData] = useState<LoginDataProps>({
    username: '',
    password: '',
  });

  return (
    <LoginContainer>
      <LoginView>
        <LeftWrapper>
          <PrimaryText color={MAXIMUM_RED_PURPLE}>Login</PrimaryText>
          <Text color={GRAY} align="left">
            Welcome! Login to make your life simpler through managing your
            future tasks.
          </Text>
        </LeftWrapper>
        <Wrapper>
          <Input
            value={loginData.username}
            setValue={(value: string) =>
              setLoginData({ ...loginData, username: value })
            }
            placeholder="Username:"
            type="text"
          />
          <Input
            value={loginData.password}
            setValue={(value: string) =>
              setLoginData({ ...loginData, password: value })
            }
            placeholder="Password:"
            type="password"
          />
        </Wrapper>
        <Wrapper margin="50px 0 0 0">
          <Button
            label={'Login'}
            onClick={() => login(loginData.username, loginData.password)}
          />
        </Wrapper>
        <Wrapper margin='50px 0 0 0'>
            <Text color='#000'>Don't have an account ?</Text>
            <TertiaryButton label={'Register'} onClick={()=>switchView()}/>
          </Wrapper>
      </LoginView>
    </LoginContainer>
  );
};

export default Login;
