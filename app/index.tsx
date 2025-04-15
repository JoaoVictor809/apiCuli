import { Text, View } from "react-native";
import MealList from "./MealList";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MealList />
    </View>
  );
}
