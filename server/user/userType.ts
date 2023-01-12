export const UserProps = {
  user_id: 'user_id',
  first_name: 'first_name',
  last_name: 'last_name',
  user_name: 'user_name',
  email: 'email',
  password: 'password',
} as const;

/**
 * User type
 */
export type UserType = {
  [UserProps.user_id]: string;
  [UserProps.first_name]: string;
  [UserProps.last_name]: string;
  [UserProps.user_name]: string;
  [UserProps.email]: string;
  [UserProps.password]: string;
};
