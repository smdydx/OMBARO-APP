import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem("accessToken");

      if (token) {
        router.replace("/(tabs)");
      } else {
        router.replace("home");
      }

      setChecking(false);
    };

    checkSession();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Checking session…</Text>
      </View>
    );
  }

  return null;
}
