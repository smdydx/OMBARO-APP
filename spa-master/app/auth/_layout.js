// app/auth/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="phone-register" />
      <Stack.Screen name="otp-verification" />
      {/* Optionally: <Stack.Screen name="index" /> if you add it */}
    </Stack>
  );
}
