import FlatListTodo from "@/components/FlatListTodo";
import FloatingButton from "@/components/FloatingButton";
import { useTodoListStore } from "@/store";
import { ITodoList } from "@/types";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  /** Property */
  const todoListStore = useTodoListStore((state) => state.todoList);
  const setTodoListStore = useTodoListStore((state) => state.setTodoList);

  const [selectedId, setSelectedId] = useState<string>("0");

  const [inputContainer, setInputContainer] = useState<string>("");
  const [openModalContainer, setOpenModalContainer] = useState<boolean>(false);

  /** Function */
  const addContainerHandler = () => {
    const container = {
      id: new Date().getTime().toString(),
      title: inputContainer,
      todos: [],
    };

    setTodoListStore([...todoListStore, container]);
    setInputContainer("");
    setOpenModalContainer((prev) => !prev);
  };

  const removeContainerHandler = (id: string) => {
    setTodoListStore(todoListStore.filter((container) => container.id !== id));
  };

  /** Render */
  return (
    <View className="flex-1 bg-white">
      <Modal
        animationType="fade"
        hardwareAccelerated={true}
        transparent={true}
        visible={openModalContainer}
        onRequestClose={() => setOpenModalContainer((prev) => !prev)}
      >
        <View className="w-[85%] flex-col bg-white top-[40%] mx-auto border border-red-800 rounded-md h-[100px]">
          <View className="flex-row items-center justify-center w-full text-center flex-1">
            <TextInput
              value={inputContainer}
              onChangeText={setInputContainer}
              placeholder="제목을 입력하세요"
              className="flex-1 pl-4 py-2 h-10"
            />
          </View>
          <View className="flex-row">
            <Pressable onPress={addContainerHandler} className="flex-1">
              <View className="w-full bg-green-500 h-8 items-center justify-center">
                <Text className="text-center text-white font-semibold">
                  생성
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => {
                setInputContainer("");
                setOpenModalContainer((prev) => !prev);
              }}
              className="flex-1"
            >
              <View className="w-full bg-red-400 h-8 items-center justify-center">
                <Text className="text-center text-white font-semibold">
                  닫기
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>

      <SafeAreaView className="flex-1 pt-5 px-5">
        <FlatList
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          data={todoListStore}
          renderItem={({ item }: { item: ITodoList }) => {
            return (
              <FlatListTodo
                item={item}
                onPress={() => setSelectedId(item.id)}
                removeContainerHandler={() => removeContainerHandler(item.id)}
              />
            );
          }}
        />
      </SafeAreaView>

      <View className="absolute bottom-7 right-7">
        <FloatingButton
          openContainerHandler={() => setOpenModalContainer((prev) => !prev)}
          addContainerHandler={addContainerHandler}
        />
      </View>
    </View>
  );
}
