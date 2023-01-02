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

/**
 * Habit type
 */
export type HabitType = {
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
 * Habit reflection type
 */
export type HabitReflection = {
  hrid: string;
  hid: string;
  description: string;
};
