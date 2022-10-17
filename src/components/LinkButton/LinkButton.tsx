import { FC } from 'react';

import * as S from './style';

interface LinkButtonProps {
  callback?: () => void;
}

const LinkButton: FC<LinkButtonProps> = ({ children, callback }) => (
  <S.LinkButtonWrapper onClick={callback}>{children}</S.LinkButtonWrapper>
);

export default LinkButton;
