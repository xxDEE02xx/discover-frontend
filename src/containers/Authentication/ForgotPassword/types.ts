export interface ForgotPasswordProps {
  callbackLinkButton?: (page: string) => void;
}

export type FormData = {
  email: string;
  queryBuilder: string;
};

export enum FieldNames {
  EMAIL = 'email',
  QUERY_BUILDER = 'queryBuilder',
}
