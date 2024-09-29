import TodoList from "@/components/TodoList";
import { useTodoListStore } from "@/store";
import { ITodoList } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

export default function Detail() {
  /** Property */
  const { id: searchParamsId } = useLocalSearchParams();

  const todoListStore = useTodoListStore((state) => state.todoList);
  const setTodoListStore = useTodoListStore((state) => state.setTodoList);

  const [inputText, setInputText] = useState<string>("");
  const [subInputText, setSubInputText] = useState<string>("");
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
          todo.id === id ? { ...todo, text: subInputText } : todo,
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
      <View className="flex-row space-x-2 mt-6 w-96 mx-auto">
        <TextInput
          value={isEditTodo === undefined ? inputText : ""}
          onChangeText={setInputText}
          placeholder="할 일을 입력하세요"
          className="border border-gray-500 rounded-md flex-1 pl-3 py-2"
        />

        <TouchableHighlight
          onPress={addTodoItemHandler}
          className="bg-red-300 justify-center px-3 rounded-md"
          disabled={subInputText.length > 0}
        >
          <Text>추가</Text>
        </TouchableHighlight>
      </View>

      <SafeAreaView className="flex-1">
        <FlatList
          data={todoListStore}
          renderItem={({ item }: ListRenderItemInfo<ITodoList>) => (
            <TodoList
              listId={item.id}
              inputText={inputText}
              subInputText={subInputText}
              setSubInputText={setSubInputText}
              isEditTodo={isEditTodo}
              todoList={item.todos}
              editHandler={(id) => setIsEditTodo(id)}
              editTodoHandler={editTodoHandler}
              deleteHandler={deleteHandler}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}
