export type Nullable<T> = T | null;

/**
 * Status Type Enum
 */
export const StatusTypes = {
  todo: 0,
  inProgress: 1,
  complete: 2,
} as const;
