import { z } from 'zod';
import { createGoalType, GoalTypeProps } from './goalType';

export type CreateGoalParams = Omit<
  createGoalType,
  typeof GoalTypeProps.goal_id
>;

export const createGoalValidator: z.ZodType<CreateGoalParams> = z.object({
  [GoalTypeProps.user_id]: z.string(),
  [GoalTypeProps.title]: z.string(),
  [GoalTypeProps.description]: z.string().optional(),
  [GoalTypeProps.target_date]: z.string().optional(),
  [GoalTypeProps.status]: z.number(),
});
