import { z } from "zod";
import { CreateJournalType, JournalTypeProps } from "./journal";

export type CreateJournalParams = Omit<
  CreateJournalType,
  typeof JournalTypeProps.jid
>;

export const createJournalValidator: z.ZodType<CreateJournalParams> = z.object({
  [JournalTypeProps.uid]: z.string(),
  [JournalTypeProps.title]: z.string(),
  [JournalTypeProps.description]: z.string(),
  [JournalTypeProps.date]: z.string(),
});
