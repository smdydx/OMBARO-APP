import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const EmailVerifySuccess = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
      }}
    >
      {/* ✅ Success Icon */}
      <View
        style={{
          backgroundColor: "#e4fbe7",
          padding: 20,
          borderRadius: 100,
          marginBottom: 20,
        }}
      >
        <MaterialIcons name="check-circle" size={60} color="#28c76f" />
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "700",
          color: "#28c76f",
          marginBottom: 10,
        }}
      >
        Email Verified!
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "#555",
          marginBottom: 30,
          lineHeight: 22,
        }}
      >
        Your email has been successfully verified.  
        You can now continue using your account.
      </Text>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => router.replace("/(tabs)")}
        style={{
          backgroundColor: "#28c76f",
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailVerifySuccess;
