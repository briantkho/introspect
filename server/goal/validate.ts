import { z } from "zod";
import { createGoalType, GoalTypeProps } from "./goal";

export type CreateGoalParams = Omit<
  createGoalType,
  typeof GoalTypeProps.goal_id
>;

export const createGoalValidator: z.ZodType<CreateGoalParams> = z.object({
  [GoalTypeProps.user_id]: z.string(),
  [GoalTypeProps.title]: z.string(),
  [GoalTypeProps.description]: z.string().nullable(),
  [GoalTypeProps.target_date]: z.string().optional(),
  [GoalTypeProps.status]: z.number(),
});
