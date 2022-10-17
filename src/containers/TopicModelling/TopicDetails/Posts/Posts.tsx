import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TablePagination from '@mui/material/TablePagination';
import Divider from '@mui/material/Divider';

import { mockTopics } from 'common/mocks/datasets';

import Filter from './Filter';
import PostItem from './PostItem';
import * as S from './style';
interface PostsProps {
  keywordsSelected: any;
}

const Posts: FC<PostsProps> = ({ keywordsSelected }) => {
  const { t: translate } = useTranslation('jobs');
  const { query } = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const topicId = query['topicId'] as unknown;
  const { samplePosts: mockPosts, keywords } = mockTopics[topicId as keyof typeof mockTopics];

  const keywordsSelectedJoin = Array.from(keywordsSelected).join(', ');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const keywordsSet = keywordsSelected.size
    ? keywordsSelected
    : new Set(keywords.map(keyword => keyword[0]));

  const mockPostsMatchKeyword = mockPosts.filter(post => {
    const postWithTag = (Array.from(keywordsSet) as string[])
      .sort((a, b) => {
        return b.length - a.length;
      })
      .filter(keyword => {
        const regex = new RegExp(keyword, 'gi');
        const matchKeyword = post.match(regex);
        return matchKeyword?.length;
      }, post);
    return postWithTag.length;
  });

  useEffect(() => {
    setPage(0);
    setRowsPerPage(10);
  }, [keywordsSelected]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, rowsPerPage]);

  return (
    <div id="tableTitle">
      <S.PostsHeaderWrapper>
        <Typography variant="h6" component="div">
          <Trans i18nKey="dataset:KEYWORDS_SAMPLE_POST" values={{ platform: 'Twitter' }} />
        </Typography>
        <Filter />
      </S.PostsHeaderWrapper>
      {!!keywordsSelected.size && (
        <Typography variant="body1" component="div" sx={{ pb: 2 }}>
          <Trans
            i18nKey="dataset:POSTS_SUB_CONTENT"
            values={{
              keywords: keywordsSelectedJoin,
              postsCount: 54,
              percentage: 0.04,
              topicCount: 135,
            }}
            components={{
              a: <FormatQuoteIcon sx={{ transform: 'scaleX(-1)', fontSize: '0.8rem' }} />,
              b: <FormatQuoteIcon sx={{ fontSize: '0.8rem' }} />,
              span: <S.PostsKeywordsList />,
            }}
          />
        </Typography>
      )}
      {mockPostsMatchKeyword.length ? (
        <>
          {mockPostsMatchKeyword
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post, key) => (
              <PostItem
                key={`post-item-${key}`}
                keywordsSelected={keywordsSet}
                postContent={post}
                postDate="29 July 2022"
                likes={2539}
                comments={723}
                retweets={1923}
                link="https://twitter.com/?lang=en"
              />
            ))}
          <Divider sx={{ mb: 2 }} />
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={mockPostsMatchKeyword.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography variant="h6" component="div" align="center" sx={{ pt: 4 }}>
          {translate('EMPTY_KEYWORDS_MATCH')}
        </Typography>
      )}
    </div>
  );
};

export default Posts;
