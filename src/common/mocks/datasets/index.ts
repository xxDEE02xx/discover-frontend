import { STATUS } from 'common/types/jobStatus';

export * from './keywords';
export * from './jobs';
export * from './posts';
export * from './topics';

export const mockDatasets = [
  {
    id: 1,
    title: 'Never Have I Ever Season 3',
    status: STATUS.FAILED,
    dateCreated: 1656574910000,
    source: 'Twitter',
    postsCount: 483205,
    owner: 'Nic',
    tags: ['Netflix', 'Social Recaps', 'Never Have I Ever', 'romcom', 'series', 'entertainment'],
    jobs: [
      {
        id: 1,
        name: 'Job 3d2675d0-5edb-4cea-a886-9307cc276186',
        dateCreated: 1656574910000,
        status: STATUS.FAILED,
      },
    ],
  },
  {
    id: 2,
    title: 'World Bank COP26',
    status: STATUS.SUCCESS,
    dateCreated: 1657352510000,
    source: 'Twitter',
    postsCount: 583803,
    owner: 'Andrea',
    tags: ['World Bank', 'COP26', 'climate change', 'sustainability', 'conference', 'campaigns'],
    jobs: [
      {
        id: 5,
        name: 'Job 3d2675d0-5edb-4cea-a886-9307cc276186',
        dateCreated: 1657359773000,
        status: STATUS.SUCCESS,
      },
      {
        id: 6,
        name: 'Job 3d2675d0-5edb-4cea-a886-9307cc276186',
        dateCreated: 1657352510000,
        status: STATUS.FAILED,
      },
    ],
  },
  {
    id: 3,
    title: 'r/WallStreetBets',
    status: STATUS.PENDING,
    dateCreated: 1656834110000,
    source: 'Reddit',
    postsCount: 183104,
    owner: 'Pavan',
    tags: ['Reddit', 'finance', 'cryptocurrency', 'audiences'],
    jobs: [
      {
        id: 2,
        name: 'Job 3d2675d0-5edb-4cea-a886-9307cc276186',
        dateCreated: 1656834110000,
        status: STATUS.PENDING,
      },
    ],
  },
  {
    id: 4,
    title: 'Sustainability Audiences Refresh',
    status: STATUS.STARTED,
    dateCreated: 1658043710000,
    source: 'Twitter',
    postsCount: 383702,
    owner: 'Winston',
    tags: ['Sustainability Lab', 'sustainabilty', 'audiences', 'Singapore'],
    jobs: [
      {
        id: 4,
        name: 'Job 3d2675d0-5edb-4cea-a886-9307cc276186',
        dateCreated: 1658043710000,
        status: STATUS.STARTED,
      },
    ],
  },
  {
    id: 5,
    title: 'Givaudan Future of Aging',
    status: STATUS.STARTED,
    dateCreated: 1658994110000,
    source: 'Twitter',
    postsCount: 653402,
    owner: 'Yi Kuang',
    tags: ['Givaudan', 'Future of Aging', 'futures'],
    jobs: [
      {
        id: 4,
        name: 'Job 3d2675d0-5edb-4cea-a886-9307cc276186',
        dateCreated: 1658994110000,
        status: STATUS.STARTED,
      },
    ],
  },
];
