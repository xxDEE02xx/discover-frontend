import { STATUS } from 'common/types/jobStatus';

export const mockJobs = [
  {
    id: 4,
    title: 'Topic Modelling Job 1',
    details: 'Twitter • 7 Oct - 26 Nov 2021 • Global • English • 19,857 posts',
    dateCreated: '3 August',
    status: STATUS.SUCCESS,
    topicsCount: 6,
  },
  // {
  //   id: 1,
  //   title: 'Job 1',
  //   details: 'Facebook • 1-31 May 2022 • USA • English • 5,543 posts',
  //   dateCreated: '2 June',
  //   status: STATUS.FAILED,
  //   topicsCount: 0,
  // },
  // {
  //   id: 2,
  //   title: 'Job 2',
  //   details: 'Twitter • 1-30 June 2022 • Argentina • English • 4,134 posts',
  //   dateCreated: '5 July',
  //   status: STATUS.STARTED,
  //   topicsCount: 0,
  // },
  // {
  //   id: 3,
  //   title: 'Job 3',
  //   details: 'Twitter • 1-30 June 2022 • Chile • English • 1,958 posts',
  //   dateCreated: '12 July',
  //   status: STATUS.REVOKED,
  //   topicsCount: 0,
  // },
  // {
  //   id: 5,
  //   title: 'Job 5',
  //   details: 'Facebook • 1-30 July 2022 • Mexico • English • 2,475 posts',
  //   dateCreated: '9 August',
  //   status: STATUS.PENDING,
  //   topicsCount: 0,
  // },
];
