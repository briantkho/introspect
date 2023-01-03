import type { Nullable } from "../utils/types";

/**
 * Task type
 */

export const TaskProps = {
  tid: "tid",
  hid: "habit_id",
  title: "title",
  description: "description",
  checked: "checked",
  date: "date",
} as const;

export type CreateTaskType = {
  [TaskProps.tid]: string;
  [TaskProps.hid]: string;
  [TaskProps.title]: string;
  [TaskProps.description]: Nullable<string>;
  [TaskProps.checked]: boolean;
  [TaskProps.date]?: string;
};
