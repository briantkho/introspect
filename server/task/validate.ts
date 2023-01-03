import { z } from "zod";
import { CreateTaskType, TaskProps } from "./task";

export type CreateTaskParams = Omit<CreateTaskType, typeof TaskProps.tid>;

export const createTaskValidator: z.ZodType<CreateTaskParams> = z.object({
  [TaskProps.hid]: z.string(),
  [TaskProps.title]: z.string(),
  [TaskProps.checked]: z.boolean(),
  [TaskProps.description]: z.string().nullable(),
  [TaskProps.date]: z.string().optional(),
});
