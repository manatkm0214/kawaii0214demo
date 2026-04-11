export type KidsSavingItem = {
  id: string;
  title?: string;
  amount: number;
  date: string;
  memo?: string;
};
// 共通型: KidsSavingsGoal
export type KidsSavingsGoal = {
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate?: string;
};
