import { z } from 'zod';
import { CreateTaskType, TaskProps } from './taskType';

export type CreateTaskParams = Omit<CreateTaskType, typeof TaskProps.task_id>;

export const createTaskValidator: z.ZodType<CreateTaskParams> = z.object({
  [TaskProps.habit_id]: z.string(),
  [TaskProps.title]: z.string(),
  [TaskProps.description]: z.string().optional(),
  [TaskProps.date]: z.string().optional(),
  [TaskProps.priority]: z.number(),
  [TaskProps.status]: z.boolean(),
});
