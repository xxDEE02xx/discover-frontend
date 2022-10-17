import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';

import { ROUTES } from 'common/constant/routes';

import ForgotPasswordForm from './ForgotPassword';
import LoginForm from './Login';
import ResetPassword from './ResetPassword';
import AuthenticationPanel from './Panel';

import * as S from './style';

interface AuthenticationProps {
  defaultRoute?: string;
}

const Authentication: FC<AuthenticationProps> = ({ defaultRoute = '' }) => {
  const { push, query } = useRouter();
  const [route, setRoute] = useState<string | undefined>(defaultRoute);

  const callbackLinkButton = useCallback(
    (page: string) => {
      push(
        {
          pathname: ROUTES.PUBLIC_REQUIRED_TOKEN.LOGIN,
          ...(ROUTES.PUBLIC_REQUIRED_TOKEN.LOGIN !== page && { query: { [page]: 1 } }),
        },
        undefined,
        { shallow: true }
      );
      if (setTimeout) {
        setRoute(undefined);
        setTimeout(() => setRoute(page), 0);
      }
    },
    [push]
  );

  let componentToRender = <LoginForm callbackLinkButton={callbackLinkButton} />;
  if (route === 'forgot-password' || query['forgot-password']) {
    componentToRender = <ForgotPasswordForm callbackLinkButton={callbackLinkButton} />;
  }
  if (route === 'reset-password' || query['reset-password']) {
    componentToRender = <ResetPassword />;
  }

  return (
    <S.AuthenticationWrapper data-testid="authentication-wrapper-id">
      <S.AuthenticationBackground>
        <Image src="/images/big-data.png" width="650" height="500" alt="Big data image" />
      </S.AuthenticationBackground>
      {route !== undefined && <AuthenticationPanel>{componentToRender}</AuthenticationPanel>}
    </S.AuthenticationWrapper>
  );
};

export default Authentication;
