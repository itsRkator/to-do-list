export interface TaskItem {
  title: string;
  completed: boolean;
}

export interface TaskQuery {
  search?: string;
  status?: "completed" | "incomplete";
  page?: string;
  limit?: string;
}

export interface CreateTaskBody {
  title: string;
}

export interface UpdateTaskBody {
  completed: boolean;
}
