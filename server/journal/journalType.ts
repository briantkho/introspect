/**
 * Journal type
 */
export type Journal = {
  journal_id: string;
  user_id: string;
  title: string | null;
  description: string;
  date: Date;
};

export const JournalTypeProps = {
  journal_id: 'journal_id',
  user_id: 'user_id',
  goal_id: 'goal_id',
  title: 'title',
  description: 'description',
  date: 'date',
} as const;

export type CreateJournalType = {
  [JournalTypeProps.journal_id]: string;
  [JournalTypeProps.user_id]: string;
  [JournalTypeProps.goal_id]?: string;
  [JournalTypeProps.title]: string;
  [JournalTypeProps.description]: string;
  [JournalTypeProps.date]?: string;
};
