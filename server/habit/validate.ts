import { z } from "zod";
import { CreateHabitType, EditHabitType, HabitTypeProps } from "./habit";

export type CreateHabitParams = Omit<
  CreateHabitType,
  typeof HabitTypeProps.hid
>;
// export type EditHabitParams = Omit<EditHabitType, typeof HabitTypeProps.hid>;

export const createHabitValidator: z.ZodType<CreateHabitParams> = z.object({
  [HabitTypeProps.uid]: z.string(),
  [HabitTypeProps.name]: z.string(),
  [HabitTypeProps.frequencyPerWeek]: z.number(),
  [HabitTypeProps.description]: z.string().nullable(),
  [HabitTypeProps.startDate]: z.string(),
  [HabitTypeProps.endDate]: z.string().optional(),
  [HabitTypeProps.status]: z.number(),
});

export const editHabitValidator: z.ZodType<EditHabitType> = z.object({
  [HabitTypeProps.hid]: z.string(),
  [HabitTypeProps.uid]: z.string(),
  [HabitTypeProps.name]: z.string().nullable(),
  [HabitTypeProps.frequencyPerWeek]: z.number().nullable(),
  [HabitTypeProps.description]: z.string().nullable(),
  [HabitTypeProps.startDate]: z.string().optional(),
  [HabitTypeProps.endDate]: z.string().optional(),
  [HabitTypeProps.status]: z.number().nullable(),
});
