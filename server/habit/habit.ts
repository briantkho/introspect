/**
 * Habit type
 */
export type Habit = {
  hid: string;
  uid: string;
  name: string;
  frequencyPerWeek: number;
  description: string;
  startDate: Date;
  endDate: Date;
  status: number;
};

/**
 * Habit reflection type
 */
export type HabitReflection = {
  hrid: string;
  hid: string;
  description: string;
};
