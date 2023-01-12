import { z } from 'zod';
import { UserType, UserProps } from './userType';

export type CreateUserParams = Omit<UserType, typeof UserProps.user_id>;

export const createUserValidator: z.ZodType<CreateUserParams> = z.object({
  [UserProps.first_name]: z.string(),
  [UserProps.last_name]: z.string(),
  [UserProps.password]: z.string(),
  [UserProps.email]: z.string(),
  [UserProps.user_name]: z.string(),
});
