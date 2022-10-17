import { FC } from 'react';
import Typography from '@mui/material/Typography';
import useTranslation from 'next-translate/useTranslation';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import LaunchIcon from '@mui/icons-material/Launch';

import { ColorsEnum } from 'common/theme';
import { formatNumberSiSymbol } from 'common/helper/numberFormat';
import Link from 'components/Link';

import * as S from './style';

interface PostItemProps {
  keywordsSelected: any;
  postContent: string;
  postDate: string;
  likes: number;
  retweets: number;
  comments: number;
  link: string;
}

const PostItem: FC<PostItemProps> = ({
  keywordsSelected,
  postContent,
  postDate,
  likes,
  retweets,
  comments,
  link,
}) => {
  const { t: translate } = useTranslation('jobs');
  const { t: translateCommon } = useTranslation('common');
  const postWithTag = (Array.from(keywordsSelected) as string[])
    .sort((a, b) => {
      return b.length - a.length;
    })
    .reduce((content, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matchKeyword = content.match(regex);
      if (matchKeyword?.length) {
        matchKeyword.forEach(k => {
          const regexInner = new RegExp(k, 'g');
          content = content.replace(regexInner, `<span>${k}</span>`);
        });
      }
      return content;
    }, postContent);

  return (
    <Box sx={{ pb: 2 }}>
      <Divider sx={{ mb: 2 }} />
      <S.PostItemContent
        variant="body2"
        dangerouslySetInnerHTML={{ __html: postWithTag }}
        sx={{ mb: 2 }}
      />
      <S.PostItemFooter>
        <Typography variant="body2" component="div" sx={{ color: ColorsEnum.coolgray3 }}>
          {postDate}
        </Typography>
        <div>•</div>
        <Typography variant="body2" component="div" sx={{ color: ColorsEnum.coolgray3 }}>
          {formatNumberSiSymbol(likes)} {translate('PLATFORM_LIKES')}
        </Typography>
        <Typography variant="body2" component="div" sx={{ color: ColorsEnum.coolgray3 }}>
          {formatNumberSiSymbol(comments)} {translate('PLATFORM_COMMENTS')}
        </Typography>
        <Typography
          variant="body2"
          component="div"
          sx={{ color: ColorsEnum.coolgray3, marginRight: 'auto' }}
        >
          {formatNumberSiSymbol(retweets)} {translate('PLATFORM_RETWEETS')}
        </Typography>
        <Typography className="post-item-link-platform" variant="body2" component="div">
          <Link target="_blank" href={link} color="primary">
            {translateCommon('OPEN')} <LaunchIcon fontSize="inherit" />
          </Link>
        </Typography>
      </S.PostItemFooter>
    </Box>
  );
};

export default PostItem;
