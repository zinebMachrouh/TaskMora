export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'ToDo' | 'Doing' | 'Done';
  categoryId: string;
}
