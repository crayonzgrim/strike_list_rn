import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";

type FloatingButtonProps = {
  addContainerHandler: () => void;
};

export default function FloatingButton({
  addContainerHandler,
}: FloatingButtonProps) {
  return (
    <TouchableOpacity onPress={addContainerHandler}>
      <AntDesign name="pluscircle" size={52} color="#1e90ff" />
    </TouchableOpacity>
  );
}
