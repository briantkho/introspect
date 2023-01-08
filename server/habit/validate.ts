import { z } from "zod";
import {
  CreateHabitType,
  EditHabitType,
  HabitReflectionProps,
  HabitReflectionType,
  HabitTypeProps,
} from "./habit";

export type CreateHabitParams = Omit<
  CreateHabitType,
  typeof HabitTypeProps.habit_id
>;

export type CreateHabitReflectionParams = Omit<
  HabitReflectionType,
  typeof HabitReflectionProps.habit_reflection_id
>;

export const createHabitValidator: z.ZodType<CreateHabitParams> = z.object({
  [HabitTypeProps.user_id]: z.string(),
  [HabitTypeProps.goal_id]: z.string().optional(),
  [HabitTypeProps.title]: z.string(),
  [HabitTypeProps.frequency_per_week]: z.number().optional(),
  [HabitTypeProps.description]: z.string().nullable(),
  [HabitTypeProps.startDate]: z.string().optional(),
  [HabitTypeProps.endDate]: z.string().optional(),
  [HabitTypeProps.status]: z.number(),
});

export const editHabitValidator: z.ZodType<EditHabitType> = z.object({
  [HabitTypeProps.habit_id]: z.string(),
  [HabitTypeProps.user_id]: z.string(),
  [HabitTypeProps.title]: z.string().nullable(),
  [HabitTypeProps.frequency_per_week]: z.number().nullable(),
  [HabitTypeProps.description]: z.string().nullable(),
  [HabitTypeProps.startDate]: z.string().optional(),
  [HabitTypeProps.endDate]: z.string().optional(),
  [HabitTypeProps.status]: z.number().nullable(),
});

export const createHabitReflectionValidator: z.ZodType<CreateHabitReflectionParams> =
  z.object({
    [HabitReflectionProps.habit_id]: z.string(),
    [HabitReflectionProps.description]: z.string(),
  });
