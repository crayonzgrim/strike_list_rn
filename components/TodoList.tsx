import TodoItem from "@/components/TodoItem";
import { useTodoListStore } from "@/store";
import { ITodo } from "@/types";
import { FlatList, ListRenderItemInfo, SafeAreaView } from "react-native";

interface TodoListProps {
  listId: string;
  inputText: string;
  subInputText: string;
  setSubInputText: React.Dispatch<React.SetStateAction<string>>;
  isEditTodo: string | undefined;
  todoList: ITodo[];
  editHandler: (id: string) => void;
  editTodoHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
}

export default function TodoList({
  listId,
  inputText,
  subInputText,
  setSubInputText,
  isEditTodo,
  todoList,
  editHandler,
  editTodoHandler,
  deleteHandler,
}: TodoListProps) {
  /** Property */
  const todoListStore = useTodoListStore((state) => state.todoList);
  const setTodoListStore = useTodoListStore((state) => state.setTodoList);

  /** Function */
  const selectToggleHandler = (id: string) => {
    const newTodoLists = todoList.map((todo) => {
      return {
        ...todo,
        completed: todo.id === id ? !todo.completed : todo.completed,
      };
    });

    const updateTodoList = todoListStore.map((todoList) => {
      return todoList.id === listId
        ? { ...todoList, todos: newTodoLists }
        : todoList;
    });

    setTodoListStore(updateTodoList);
  };

  /** Render */
  return (
    <SafeAreaView className="flex-1 py-1">
      <FlatList
        data={todoList}
        renderItem={({ item: todo }: ListRenderItemInfo<ITodo>) => (
          <TodoItem
            id={todo.id}
            inputText={inputText}
            subInputText={subInputText}
            setSubInputText={setSubInputText}
            isEditTodo={isEditTodo}
            todo={todo}
            editHandler={editHandler}
            editTodoHandler={editTodoHandler}
            deleteHandler={deleteHandler}
            selectToggleHandler={selectToggleHandler}
          />
        )}
        keyExtractor={(todo) => todo.id}
      />
    </SafeAreaView>
  );
}
