import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "pink",
          },
        }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={{
          title: "Detail",
          headerStyle: {
            backgroundColor: "green",
          },
        }}
      />
    </Stack>
  );
}
