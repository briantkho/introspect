/**
 * Goal Type Props
 */
export const GoalTypeProps = {
  goal_id: 'goal_id',
  user_id: 'user_id',
  title: 'title',
  description: 'description',
  target_date: 'target_date',
  status: 'status',
} as const;

export type createGoalType = {
  [GoalTypeProps.goal_id]: string;
  [GoalTypeProps.user_id]: string;
  [GoalTypeProps.title]: string;
  [GoalTypeProps.description]?: string;
  [GoalTypeProps.target_date]?: string;
  [GoalTypeProps.status]: number;
};
