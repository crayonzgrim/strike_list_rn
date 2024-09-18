import { ITodo } from "@/types";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type TodoItemProps = {
  id: string;
  inputText: string;
  setInputText: (text: string) => void;
  isEditTodo: string | undefined;
  todo: ITodo;
  editHandler: (id: string) => void;
  editTodoHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
  selectToggleHandler: (id: string) => void;
};

export default function TodoItem({
  id,
  inputText,
  setInputText,
  isEditTodo,
  todo,
  editHandler,
  editTodoHandler,
  deleteHandler,
  selectToggleHandler,
}: TodoItemProps) {
  /** Property */
  const [modalVisible, setModalVisible] = useState(false);

  /** Render */
  return (
    <View className="flex-row items-center justify-between w-full my-2">
      <View className="flex-row items-center space-x-2">
        <Checkbox
          value={todo?.completed}
          onValueChange={() => selectToggleHandler(todo?.id)}
          color={todo?.completed ? "#4630EB" : undefined}
        />
        <View>
          <Modal
            animationType="fade"
            hardwareAccelerated={true}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View className="h-[12%] w-[85%] flex-col bg-white top-[40%] mx-auto border border-red-800 rounded-md">
              <View className="flex-row items-center justify-center w-full text-center flex-1">
                <Text>{todo.text}</Text>
              </View>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <View className="w-full bg-red-400 h-8 items-center justify-center">
                  <Text className="text-center">닫기</Text>
                </View>
              </Pressable>
            </View>
          </Modal>

          {id === isEditTodo ? (
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder={inputText}
              className="border border-gray-500 rounded-md flex-1 pl-4 py-2 max-w-[230px] min-w-[230px]"
            />
          ) : (
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text
                className={`text-lg ${todo.completed ? "line-through text-gray-400" : "text-black"} w-[220px]`}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {todo.text}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
      <View className="flex-row space-x-6">
        {id === isEditTodo ? (
          <TouchableOpacity onPress={() => editTodoHandler(todo.id)}>
            <Text className="text-yellow-600">완료</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => editHandler(todo.id)}>
            <Text className="text-green-600">수정</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteHandler(todo.id)}>
          <Text className="text-red-600">삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
