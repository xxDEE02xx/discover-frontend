import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Typography from '@mui/material/Typography';

import * as S from './style';

interface DetailItemProps {
  title: string;
  value?: string | number;
  icon: any;
  content?: any;
}

const DetailItem: FC<DetailItemProps> = ({ content, icon, value, title }) => {
  const { t: translate } = useTranslation('jobs');
  return (
    <S.DetailItemWrapper>
      {icon}
      <div>
        <Typography variant="subtitle2" component="div">
          {title}
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          {value}
        </Typography>
        {content}
      </div>
    </S.DetailItemWrapper>
  );
};

export default DetailItem;
