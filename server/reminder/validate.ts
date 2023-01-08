import { z } from "zod";
import { CreateReminderType, ReminderProps } from "./reminder";

export type CreateReminderParams = Omit<
  CreateReminderType,
  typeof ReminderProps.reminder_id
>;

export const createReminderValidator: z.ZodType<CreateReminderParams> =
  z.object({
    [ReminderProps.reminderTime]: z.string(),
  });
