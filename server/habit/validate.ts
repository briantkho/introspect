import { z } from "zod";
import { HabitType, HabitTypeProps } from "./habit";

export type CreateHabitParams = Omit<HabitType, typeof HabitTypeProps.hid>;

export const createHabitValidator: z.ZodType<CreateHabitParams> = z.object({
  [HabitTypeProps.uid]: z.string(),
  [HabitTypeProps.name]: z.string(),
  [HabitTypeProps.frequencyPerWeek]: z.number(),
  [HabitTypeProps.description]: z.string().nullable(),
  [HabitTypeProps.startDate]: z.string(),
  [HabitTypeProps.endDate]: z.string().optional(),
  [HabitTypeProps.status]: z.number(),
});
