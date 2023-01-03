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
  typeof HabitTypeProps.hid
>;

export type CreateHabitReflectionParams = Omit<
  HabitReflectionType,
  typeof HabitReflectionProps.hrid
>;

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

export const createHabitReflectionValidator: z.ZodType<CreateHabitReflectionParams> =
  z.object({
    [HabitReflectionProps.hid]: z.string(),
    [HabitReflectionProps.description]: z.string(),
  });
