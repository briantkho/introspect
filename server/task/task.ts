import type { Nullable } from "../utils/types";

/**
 * Task type
 */

export const TaskProps = {
  task_id: "task_id",
  habit_id: "habit_id",
  title: "title",
  description: "description",
  status: "status",
  date: "date",
} as const;

export type CreateTaskType = {
  [TaskProps.task_id]: string;
  [TaskProps.habit_id]: string;
  [TaskProps.title]: string;
  [TaskProps.description]: Nullable<string>;
  [TaskProps.status]: boolean;
  [TaskProps.date]?: string;
};
