/**
 * Reminder Props
 */

export const ReminderProps = {
  reminder_id: "reminder_id",
  habit_id: "habit_id",
  reminderTime: "reminder_time",
} as const;

/**
 * Reminder type
 */
export type CreateReminderType = {
  [ReminderProps.reminder_id]: string;
  [ReminderProps.habit_id]: string;
  [ReminderProps.reminderTime]: string;
};
