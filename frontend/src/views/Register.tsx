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

type RegisterDataProps = {
  username: string;
  password: string;
};

const Register: FC<{switchView: ()=>void}> = ({switchView}) => {
  const { register } = useAuth();

  const [registerData, setRegisterData] = useState<RegisterDataProps>({
    username: '',
    password: '',
  });

  return (
    <LoginContainer>
      <LoginView>
        <LeftWrapper>
          <PrimaryText color={MAXIMUM_RED_PURPLE}>Register</PrimaryText>
          <Text color={GRAY} align="left">
            Welcome! Create an account and become a better version of yourself.
          </Text>
        </LeftWrapper>
        <Wrapper>
          <Input
            value={registerData.username}
            setValue={(value: string) =>
              setRegisterData({ ...registerData, username: value })
            }
            placeholder="Username:"
            type="text"
          />
          <Input
            value={registerData.password}
            setValue={(value: string) =>
              setRegisterData({ ...registerData, password: value })
            }
            placeholder="Password:"
            type="password"
          />
        </Wrapper>
        <Wrapper margin="50px 0 0 0">
          <Button
            label={'Create account'}
            onClick={() => register(registerData.username, registerData.password)}
          />
        </Wrapper>
        <Wrapper margin='50px 0 0 0'>
            <Text color='#000'>Already have an account ?</Text>
            <TertiaryButton label={'Login'} onClick={()=>switchView()}/>
          </Wrapper>
      </LoginView>
    </LoginContainer>
  );
};

export default Register;
