export interface Task {

  id?: number;

  title: string;
  description?: string;

  status: 'TODO' | 'IN_PROGRESS' | 'DONE';

  priority: 'LOW' | 'MEDIUM' | 'HIGH';

  due_date?: string;

  completed_at?: string;

  user_id?: number;

  category_id?: number;

  created_at?: string;

  updated_at?: string;
}