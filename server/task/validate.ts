import { z } from "zod";
import { CreateTaskType, TaskProps } from "./task";

export type CreateTaskParams = Omit<CreateTaskType, typeof TaskProps.task_id>;

export const createTaskValidator: z.ZodType<CreateTaskParams> = z.object({
  [TaskProps.habit_id]: z.string(),
  [TaskProps.title]: z.string(),
  [TaskProps.status]: z.boolean(),
  [TaskProps.description]: z.string().nullable(),
  [TaskProps.date]: z.string().optional(),
});
