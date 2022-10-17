import { FC, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import shallow from 'zustand/shallow';

import Header from 'components/Dashboard/Header';
import { DatasetJobResponse } from 'common/types/dataset';
import { useTopicsFilterStore } from 'store/topics';
import EmptyState from 'components/EmptyState';
import LinkButton from 'components/LinkButton';

import Filter from './Filter';
import TopicItem from './TopicItem';

import * as S from './style';

interface SuggestedTopicsProps {
  job: DatasetJobResponse;
}

const Topics: FC<SuggestedTopicsProps> = ({ job }) => {
  const [search, sort] = useTopicsFilterStore(state => [state.search, state.sort], shallow);
  const { t: translate } = useTranslation('topics');
  const [topics, setTopics] = useState<any[] | null>(null);

  /*
  Api integration here contains search and status dependecies
  following function and type are not yet define
  useQuery<DatasetTopicsResponse[]>(
    ['getTopicsByJobId', jobId, search, sort],
    () =>
      getTopicsByJobId({
        id: datasetId,
        status,
        name: search,
      }),
    {
      onSuccess: (data: DatasetTopicsResponse[]) => {
        setTopics(data);
      },
      enabled: !!jobId,
    }
  );
  */

  return (
    <>
      <Header
        title={job.name || ''}
        description={
          <Trans
            i18nKey="topics:JOB_SUB_HEADER"
            values={{
              topics: '200'.toLocaleString(),
              documents: '100000'.toLocaleString(),
              classified: 38,
            }}
            components={{
              link: <LinkButton>{translate('TOPIC_MORE_DETAILS')}</LinkButton>,
            }}
          />
        }
        rightContent={<Filter />}
      />
      <S.TopicsBodyWrapper>
        <S.TopicsOverviewLeftPanel>
          <Typography variant="overline" component="div">
            {translate('TOPIC_HISTOGRAM')}
          </Typography>
          <Divider sx={{ mt: 1, mb: 3 }} />
        </S.TopicsOverviewLeftPanel>
        <S.TopicsOverviewRightPanel>
          <Typography variant="overline" component="div">
            {translate('SUGGESTED_TOPICS')}
          </Typography>
          <Divider sx={{ mt: 1, mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              {topics?.length === 0 ? (
                <EmptyState
                  {...(search || sort
                    ? {
                        header: translate('TOPICS_EMPTY_FILTER_HEADER'),
                        details: translate('TOPICS_EMPTY_FILTER_DETAILS'),
                      }
                    : {
                        header: translate('TOPICS_EMPTY_HEADER'),
                        details: translate('TOPICS_EMPTY_DETAILS'),
                      })}
                />
              ) : (
                /* do mapping here once api during integration */
                <TopicItem
                  title="Any title here"
                  documents={5043}
                  classified={8}
                  keywords={[
                    'track',
                    '1.5ºC',
                    'warming',
                    '1.5 degrees',
                    '2030',
                    'pledges',
                    'century',
                    'reach',
                    'report',
                    'disastrous heating',
                  ]}
                />
              )}
            </Grid>
          </Grid>
        </S.TopicsOverviewRightPanel>
      </S.TopicsBodyWrapper>
    </>
  );
};

export default Topics;
