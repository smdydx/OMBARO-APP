import { Redirect } from "expo-router";

export default function Index() {
  // Skip authentication - direct access to home
  return <Redirect href="/(tabs)" />;
}
