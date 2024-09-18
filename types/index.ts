export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface ITodoList {
  id: string;
  title: string;
  todos: ITodo[];
}
