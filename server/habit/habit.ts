import type { Nullable } from "../utils/types";

export const HabitTypeProps = {
  habit_id: "habit_id",
  user_id: "user_id",
  title: "name",
  frequency_per_week: "frequency_per_week",
  description: "description",
  startDate: "start_date",
  endDate: "end_date",
  status: "status",
} as const;

export const HabitReflectionProps = {
  habit_reflection_id: "habit_reflection_id",
  habit_id: "habit_id",
  description: "description",
} as const;

/**
 * Create Habit type
 */
export type CreateHabitType = {
  [HabitTypeProps.habit_id]: string;
  [HabitTypeProps.user_id]: string;
  [HabitTypeProps.title]: string;
  [HabitTypeProps.frequency_per_week]?: number;
  [HabitTypeProps.description]?: string;
  [HabitTypeProps.startDate]?: string;
  [HabitTypeProps.endDate]?: string;
  [HabitTypeProps.status]: number;
};

/**
 * Edit Habit Type
 */
export type EditHabitType = {
  [HabitTypeProps.habit_id]: string;
  [HabitTypeProps.user_id]: string;
  [HabitTypeProps.title]: Nullable<string>;
  [HabitTypeProps.frequency_per_week]: Nullable<number>;
  [HabitTypeProps.description]: Nullable<string>;
  [HabitTypeProps.startDate]?: string;
  [HabitTypeProps.endDate]?: string;
  [HabitTypeProps.status]: Nullable<number>;
};

/**
 * Status Type Enum
 */
export const StatusTypes = {
  todo: 0,
  inProgress: 1,
  complete: 2,
} as const;

/**
 * Habit reflection type
 */
export type HabitReflectionType = {
  [HabitReflectionProps.habit_reflection_id]: string;
  [HabitReflectionProps.habit_id]: string;
  [HabitReflectionProps.description]: string;
};
