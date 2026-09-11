import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="course/[id]"
        options={{
          title: "Course Details",
          headerBackTitle: "Back",
        }}
      />

      <Stack.Screen
        name="student/[id]"
        options={{
          title: "Student Details",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}