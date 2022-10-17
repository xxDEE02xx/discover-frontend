export type FormData = {
  password: string;
  confirmPassword: string;
};

export enum FieldNames {
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export enum ValidationOptions {
  min = 6,
  max = 18,
}
