export interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export interface TaskContextProps {
  tasks: Task[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  fetchTasks: (search?: string, status?: string) => void;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

export interface TaskProviderProps {
  children: ReactNode;
}
