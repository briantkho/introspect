import { z } from 'zod';
import { CreateJournalType, JournalTypeProps } from './journalType';

export type CreateJournalParams = Omit<
  CreateJournalType,
  typeof JournalTypeProps.journal_id
>;

export const createJournalValidator: z.ZodType<CreateJournalParams> = z.object({
  [JournalTypeProps.user_id]: z.string(),
  [JournalTypeProps.goal_id]: z.string().optional(),
  [JournalTypeProps.title]: z.string(),
  [JournalTypeProps.description]: z.string(),
  [JournalTypeProps.date]: z.string().optional(),
});
