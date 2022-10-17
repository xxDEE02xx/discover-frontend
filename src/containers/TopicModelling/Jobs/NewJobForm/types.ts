export type FormData = {
  label: string;
  startDate: string;
  endDate: string;
  market: string;
  language: string;
};

export enum FieldNames {
  LABEL = 'label',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  MARKET = 'market',
  LANGUAGE = 'language',
}
