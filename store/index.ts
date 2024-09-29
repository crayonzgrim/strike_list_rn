import { getAsyncStorageData, setAsyncStorageData } from "@/store/storage";
import { ITodoList } from "@/types";
import { create } from "zustand";

type TodoListStore = {
  todoList: ITodoList[];
  setTodoList: (todoList: ITodoList[]) => void;
  loadTodoList: () => Promise<void>;
};

export const useTodoListStore = create<TodoListStore>((set) => ({
  todoList: [],

  setTodoList: (todoList: ITodoList[]) => {
    set((state) => {
      const updatedList = [...todoList];
      setAsyncStorageData("todoList", JSON.stringify(updatedList)); // AsyncStorage에 저장
      return { ...state, todoList: updatedList };
    });
  },

  loadTodoList: async () => {
    const storedList = await getAsyncStorageData("todoList");
    if (storedList) {
      set({ todoList: storedList });
    } else {
      set({ todoList: BOX_DATA });
    }
  },
}));

const BOX_DATA = [
  {
    id: "1",
    title: "First example",
    todos: [
      { id: "1", text: "Todo 1", completed: false },
      { id: "2", text: "Todo 2", completed: true },
      {
        id: "3",
        text: "Hello world This is me Dongil kim Nice to meet you",
        completed: false,
      },
      { id: "4", text: "Todo 3", completed: true },
      { id: "5", text: "Todo 3", completed: false },
      { id: "6", text: "Todo 3", completed: false },
      { id: "7", text: "Todo 3", completed: false },
      { id: "8", text: "Todo 3", completed: false },
      { id: "9", text: "Todo 3", completed: false },
      { id: "10", text: "Todo 3", completed: false },
    ],
  },
  {
    id: "2",
    title: "Second example",
    todos: [
      {
        id: "21",
        text: "lorem ipsum hello world hi djfklajsk",
        completed: false,
      },
      { id: "22", text: "Todo 3", completed: true },
      { id: "23", text: "Todo 3", completed: false },
      { id: "24", text: "Todo 3", completed: false },
      { id: "25", text: "Todo 3", completed: false },
      { id: "26", text: "Todo 3", completed: false },
      { id: "27", text: "Todo 27", completed: false },
      { id: "28", text: "Todo 28", completed: false },
    ],
  },
];
