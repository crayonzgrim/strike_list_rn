import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";

type FloatingButtonProps = {
  openContainerHandler: any;
  addContainerHandler: () => void;
};

export default function FloatingButton({
  openContainerHandler,
  addContainerHandler,
}: FloatingButtonProps) {
  return (
    <TouchableOpacity
      onPress={openContainerHandler}
      className="bg-white rounded-full"
    >
      <AntDesign name="pluscircle" size={52} color="#1e90ff" />
    </TouchableOpacity>
  );
}
