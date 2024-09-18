import TodoList from "@/components/TodoList";
import { useTodoListStore } from "@/store";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";

export default function Detail() {
  /** Property */
  const { id: searchParamsId } = useLocalSearchParams();

  const todoListStore = useTodoListStore((state) => state.todoList);
  const setTodoListStore = useTodoListStore((state) => state.setTodoList);

  const [inputText, setInputText] = useState<string>("");
  const [isEditTodo, setIsEditTodo] = useState<string | undefined>(undefined);

  /** Function */
  const addTodoItemHandler = () => {
    const todoItem = {
      id: new Date().getTime().toString(),
      text: inputText,
      completed: false,
    };

    const updatedTodoListStore = todoListStore.map((todoList) => {
      if (todoList.id === searchParamsId) {
        return { ...todoList, todos: [...todoList.todos, todoItem] };
      }
      return todoList;
    });

    setTodoListStore(updatedTodoListStore);

    setInputText("");
  };

  const editTodoHandler = (id: string) => {
    const updatedTodoListStore = todoListStore.map((todoList) => {
      if (todoList.id === searchParamsId) {
        const filteredList = todoList.todos.map((todo) =>
          todo.id === id ? { ...todo, text: inputText } : todo,
        );
        return { ...todoList, todos: filteredList };
      }

      return todoList;
    });

    setIsEditTodo(undefined);
    setInputText("");
    setTodoListStore(updatedTodoListStore);
  };

  const deleteHandler = (id: string) => {
    const updatedTodoListStore = todoListStore.map((todoList) => {
      if (todoList.id === searchParamsId) {
        const filteredList = todoList.todos.filter((todo) => todo.id !== id);
        return { ...todoList, todos: filteredList };
      }

      return todoList;
    });

    setTodoListStore(updatedTodoListStore);
  };

  /** Render */
  return (
    <View className="bg-white flex-1">
      <View className="w-96 mx-auto">
        <View className="flex-row space-x-2 mt-6">
          <TextInput
            value={isEditTodo === undefined ? inputText : ""}
            onChangeText={setInputText}
            placeholder="할 일을 입력하세요"
            className="border border-gray-500 rounded-md flex-1 pl-4 py-2"
          />

          <TouchableHighlight
            onPress={addTodoItemHandler}
            className="bg-red-300 justify-center px-3 rounded-md"
          >
            <Text>추가</Text>
          </TouchableHighlight>
        </View>

        {todoListStore?.map((todo) => {
          if (todo.id === searchParamsId) {
            return (
              <TodoList
                key={todo.id}
                listId={todo.id}
                inputText={inputText}
                setInputText={setInputText}
                isEditTodo={isEditTodo}
                todoList={todo.todos}
                editHandler={(id) => setIsEditTodo(id)}
                editTodoHandler={editTodoHandler}
                deleteHandler={deleteHandler}
              />
            );
          }
        })}
      </View>
    </View>
  );
}
