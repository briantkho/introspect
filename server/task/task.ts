import type { Nullable } from "../utils/types";

/**
 * Task type
 */

export const TaskProps = {
  task_id: "task_id",
  habit_id: "habit_id",
  title: "title",
  description: "description",
  date: "date",
  priority: "priority",
  status: "status",
} as const;

export type CreateTaskType = {
  [TaskProps.task_id]: string;
  [TaskProps.habit_id]: string;
  [TaskProps.title]: string;
  [TaskProps.description]: Nullable<string>;
  [TaskProps.date]?: string;
  [TaskProps.priority]: number;
  [TaskProps.status]: boolean;
};
