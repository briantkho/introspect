/**
 * Journal type
 */
export type Journal = {
  jid: string;
  uid: string;
  title: string | null;
  description: string;
  date: Date;
};

export const JournalTypeProps = {
  jid: "jid",
  uid: "uid",
  title: "title",
  description: "description",
  date: "date",
} as const;

export type CreateJournalType = {
  [JournalTypeProps.jid]: string;
  [JournalTypeProps.uid]: string;
  [JournalTypeProps.title]: string;
  [JournalTypeProps.description]: string;
  [JournalTypeProps.date]: string;
};
