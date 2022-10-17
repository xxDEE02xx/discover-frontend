import { FC } from 'react';
import Typography from '@mui/material/Typography';

import * as S from './style';

interface HeaderProps {
  title: string;
  description: any;
  rightContent?: any;
  alignItems?: string;
}

const Header: FC<HeaderProps> = ({ alignItems, title, description, rightContent }) => {
  return (
    <S.HeaderWrapper sx={{ alignItems }}>
      <div>
        <Typography variant="h4" gutterBottom component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          component="div"
          color="text.secondary"
          sx={{ mb: 0 }}
        >
          {description}
        </Typography>
      </div>
      <div>{rightContent}</div>
    </S.HeaderWrapper>
  );
};

export default Header;
