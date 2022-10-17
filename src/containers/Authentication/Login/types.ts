export interface LoginProps {
  callbackLinkButton?: (page: string) => void;
}

export type FormData = {
  email: string;
  password: string;
};

export enum FieldNames {
  EMAIL = 'email',
  PASSWORD = 'password',
}
