import type { Nullable } from "../utils/types";

export const HabitTypeProps = {
  hid: "hid",
  uid: "uid",
  name: "name",
  frequencyPerWeek: "frequency_per_week",
  description: "description",
  startDate: "start_date",
  endDate: "end_date",
  status: "status",
} as const;

export const HabitReflectionProps = {
  hrid: "hrid",
  hid: "habit_id",
  description: "description",
} as const;

/**
 * Create Habit type
 */
export type CreateHabitType = {
  [HabitTypeProps.hid]: string;
  [HabitTypeProps.uid]: string;
  [HabitTypeProps.name]: string;
  [HabitTypeProps.frequencyPerWeek]: number;
  [HabitTypeProps.description]: Nullable<string>;
  [HabitTypeProps.startDate]: string;
  [HabitTypeProps.endDate]?: string;
  [HabitTypeProps.status]: number;
};

/**
 * Edit Habit Type
 */
export type EditHabitType = {
  [HabitTypeProps.hid]: string;
  [HabitTypeProps.uid]: string;
  [HabitTypeProps.name]: Nullable<string>;
  [HabitTypeProps.frequencyPerWeek]: Nullable<number>;
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
  [HabitReflectionProps.hrid]: string;
  [HabitReflectionProps.hid]: string;
  [HabitReflectionProps.description]: string;
};
