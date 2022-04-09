import { WHITE } from '../design/colors';
import { HeaderContainer } from '../elements/containers';
import { HeaderBox, StyledHeader } from '../elements/header';
import { PrimaryText } from '../elements/text';

const Header = () => (
  <StyledHeader>
    <HeaderContainer>
      <HeaderBox horizontal="flex-start">
        <PrimaryText color={WHITE}>LOGO </PrimaryText>
      </HeaderBox>
      <HeaderBox>
        <PrimaryText color={WHITE}>App Name</PrimaryText>
      </HeaderBox>
      <HeaderBox horizontal="flex-end">
        <PrimaryText color={WHITE}>Welcome user</PrimaryText>
      </HeaderBox>
    </HeaderContainer>
  </StyledHeader>
);

export default Header;
