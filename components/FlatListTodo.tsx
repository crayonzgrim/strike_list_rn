import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

type ItemData = {
  id: string;
  title: string;
};

type RenderItemProps = {
  item: ItemData;
  onPress: () => void;
};

export default function FlatListTodo({ item, onPress }: RenderItemProps) {
  return (
    <Link
      href={`/detail/${item.id}`}
      className="h-36 bg-blue-50 mb-3 p-2 rounded-md"
      onPress={onPress}
    >
      <TouchableOpacity>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    </Link>
  );
}
