import { FC } from 'react';
import Container from '@mui/material/Container';
import Image from 'next/image';

import ToggleThemeMode from 'components/ToggleThemeMode';

import * as S from './style';

const AuthenticationPanel: FC<{}> = ({ children }) => (
  <S.AuthWrapper data-testid="auth-container-id">
    <S.AuthContentWrapper>
      <Container>
        <S.ToggleModeWrapper>
          <ToggleThemeMode />
        </S.ToggleModeWrapper>
        <S.AuthLogoWrapper>
          <Image src="/images/logo.png" height="58" width="195" alt="synthesis logo" priority />
        </S.AuthLogoWrapper>
        {children}
      </Container>
    </S.AuthContentWrapper>
  </S.AuthWrapper>
);

export default AuthenticationPanel;
