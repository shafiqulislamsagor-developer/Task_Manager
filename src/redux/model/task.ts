// models/task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: "pending" | "completed";
}
