import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "할 일 리스트",
          headerStyle: {
            backgroundColor: "#2A9764",
          },
        }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={{
          title: "상세 리스트",
          headerStyle: {
            backgroundColor: "#2A9764",
          },
        }}
      />
    </Stack>
  );
}
