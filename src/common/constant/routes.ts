export const ROUTES = {
  PRIVATE: {
    DATASETS: '/',
    DATASET: '/jobs/[datasetId]',
    SUGGESTED_TOPICS: '/jobs/[datasetId]/[jobId]',
    TOPIC_DETAILS: '/jobs/[datasetId]/[jobId]/[topicId]',
  },
  PUBLIC: {},
  PUBLIC_REQUIRED_TOKEN: {
    LOGIN: '/login',
    RESET_PASSWORD: '/reset-password',
  },
};
