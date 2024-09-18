import FlatListTodo from "@/components/FlatListTodo";
import FloatingButton from "@/components/FloatingButton";
import { useTodoListStore } from "@/store";
import { ITodoList } from "@/types";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  /** Property */
  const todoListStore = useTodoListStore((state) => state.todoList);
  const setTodoListStore = useTodoListStore((state) => state.setTodoList);

  const [selectedId, setSelectedId] = useState<string>("0");

  /** Function */
  const addContainerHandler = () => {
    const container = {
      id: new Date().getTime().toString(),
      title: `hello ${todoListStore.length + 1}`,
      todos: [],
    };
    setTodoListStore([...todoListStore, container]);
  };

  /** Render */
  return (
    <View className="flex-1 bg-white">
      <Text className="text-black text-center mb-5 py-3 font-bold text-xl bg-orange-100 border border-orange-200 w-full">
        오늘의 할 일
      </Text>

      <View className="w-full h-screen mb-16">
        <FlatList
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          data={todoListStore}
          renderItem={({ item }: { item: ITodoList }) => {
            return (
              <View className="px-6">
                <FlatListTodo
                  item={item}
                  onPress={() => setSelectedId(item.id)}
                />
              </View>
            );
          }}
        />
      </View>

      <View className="absolute bottom-10 right-4">
        <FloatingButton addContainerHandler={addContainerHandler} />
      </View>
    </View>
  );
}
