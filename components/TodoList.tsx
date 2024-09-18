import TodoItem from "@/components/TodoItem";
import { useTodoListStore } from "@/store";
import { ITodo } from "@/types";
import { FlatList, View } from "react-native";

interface TodoListProps {
  listId: string;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  isEditTodo: string | undefined;
  todoList: ITodo[];
  editHandler: (id: string) => void;
  editTodoHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
}

export default function TodoList({
  listId,
  inputText,
  setInputText,
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
    <View className="flex-col justify-between items-center bg-white my-6">
      <FlatList
        keyExtractor={(todo) => todo.id.toString()}
        data={todoList}
        renderItem={({ item }) => {
          return (
            <TodoItem
              id={item.id}
              inputText={inputText}
              setInputText={setInputText}
              isEditTodo={isEditTodo}
              todo={item}
              editHandler={editHandler}
              editTodoHandler={editTodoHandler}
              deleteHandler={deleteHandler}
              selectToggleHandler={selectToggleHandler}
            />
          );
        }}
      />
    </View>
  );
}
