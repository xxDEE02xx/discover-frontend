import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Trans from 'next-translate/Trans';

import LabelInlineEdit from 'components/LabelInlineEdit';

import * as S from './style';

interface TopicItemProps {
  title: string;
  documents: number;
  classified: number;
  keywords: string[];
}

const TopicItem: FC<TopicItemProps> = ({ title, documents, classified, keywords }) => {
  const onNewName = (value: string) => {
    console.log('value: ', value);
  };

  return (
    <S.PaperWrapper variant="outlined">
      <LabelInlineEdit value={title} callback={onNewName} />
      <Typography variant="caption" component="div" sx={{ mb: 2 }}>
        <Trans
          i18nKey="topics:TOPIC_SUB_TITLE"
          values={{ documents: documents.toLocaleString(), classified }}
        />
      </Typography>
      <S.KeywordsList>
        {keywords.map((keyword, key) => (
          <Typography key={`topic-keyword-${keyword}-${key}`} variant="caption" component="div">
            {keyword}
          </Typography>
        ))}
      </S.KeywordsList>
    </S.PaperWrapper>
  );
};

export default TopicItem;
