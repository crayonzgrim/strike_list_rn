import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type ItemData = {
  id: string;
  title: string;
};

type RenderItemProps = {
  item: ItemData;
  onPress: () => void;
  removeContainerHandler: () => void;
};

export default function FlatListTodo({
  item,
  onPress,
  removeContainerHandler,
}: RenderItemProps) {
  return (
    <View className="h-14 mb-3">
      <View className="bg-blue-50 rounded-md border border-blue-700 flex-row items-center justify-between w-full h-full px-3 space-x-3">
        <View className="flex-1 h-full items-center justify-center">
          <Link
            href={`/detail/${item.id}`}
            onPress={onPress}
            className="flex-1 w-full py-4"
          >
            <Text>{item.title}</Text>
          </Link>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center w-6 h-6 rounded-md bg-red-300"
          onPress={removeContainerHandler}
        >
          <Text className="text-white">X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
