import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type TodoModalProps = {
  modalVisible: boolean;
  modalVisibleHandler: () => void;
  showText: React.ReactNode;
};

export default function TodoModal({
  modalVisible,
  modalVisibleHandler,
  showText,
}: TodoModalProps) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => modalVisibleHandler}
      >
        <View>
          <View>
            <Text>Hello World!</Text>
            <Pressable onPress={modalVisibleHandler}>
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable onPress={modalVisibleHandler}>{showText}</Pressable>
    </View>
  );
}
